import { v4 as uuidv4 } from 'uuid'
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import { selectCheckboxes, selectActiveTab } from './filtersTickets.slice'

const initialTicketsData = {
  entities: {
    tickets: [],
    searchComplete: false,
  },
  searchId: null,
  fetchDataIdStatus: 'idle',
  error: null,
  isLoading: true,
  fetchDataStatus: 'idle', // idle, pending, fulfilled, rejected
}

export const fetchTicketsId = createAsyncThunk(
  'tickets/fetchDataId',
  async (_, { extra }) => {
    const response = await extra.api.getSearchId()
    return response.searchId
  },
  {
    condition: (_, { getState }) => {
      const isIdle = ticketsSlice.selectors.selectIsFetchDataIdIdle(getState())
      if (!isIdle) return false
      return true
    },
  }
)

let retryCount = 0
export const fetchTicketsById = createAsyncThunk(
  'tickets/fetchData',
  async (id, { dispatch, extra, getState, rejectWithValue }) => {
    try {
      const response = await extra.api.getTicketsData(id)
      const ticketsWithId = response.tickets.map((ticket) => ({
        ...ticket,
        id: uuidv4(),
      }))

      dispatch(ticketsSlice.actions.addTickets(ticketsWithId))

      if (!response.stop) {
        dispatch(fetchTicketsById(id, { dispatch, extra, getState }))
      }

      return response.tickets
    } catch (error) {
      const maxRetries = 7
      if (error.status === 500 && retryCount < maxRetries) {
        retryCount += 1
        dispatch(fetchTicketsById(id, { dispatch, extra, getState }))
      } else {
        retryCount = 0
        return rejectWithValue(error.status)
      }
    }
  },
  {
    condition: (id, { getState }) => {
      const searchId = ticketsSlice.selectors.selectTicketsSearchId(getState())
      const searchCompleted = ticketsSlice.selectors.selectTicketsSearchComplete(getState())
      if (searchCompleted) return false
      if (searchId !== id) return false
      return true
    },
  }
)

export const ticketsSlice = createSlice({
  name: 'tickets/data',
  initialState: initialTicketsData,
  reducers: {
    setTicketsData: (state, action) => {
      state.entities.tickets = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    addTickets: (state, action) => {
      state.entities.tickets = [...state.entities.tickets, ...action.payload]
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTicketsById.pending, (state) => {
      state.fetchDataStatus = 'pending'
    }),
      builder.addCase(fetchTicketsById.fulfilled, (state) => {
        state.fetchDataStatus = 'fulfilled'
        state.isLoading = false
      }),
      builder.addCase(fetchTicketsById.rejected, (state, action) => {
        state.fetchDataStatus = 'rejected'
        state.error = action.payload
      }),
      builder.addCase(fetchTicketsId.pending, (state) => {
        state.fetchDataIdStatus = 'pending'
      }),
      builder.addCase(fetchTicketsId.fulfilled, (state, action) => {
        state.fetchDataIdStatus = 'fulfilled'
        state.searchId = action.payload
      }),
      builder.addCase(fetchTicketsId.rejected, (state, action) => {
        state.fetchDataIdStatus = 'rejected'
        state.error = action.payload
      })
  },
  selectors: {
    selectIsFetchDataIdIdle: (state) => state.fetchDataIdStatus === 'idle',
    selectIsFetchDataIdPending: (state) => state.fetchDataIdStatus === 'pending',

    selectIsFetchDataIdle: (state) => state.fetchDataStatus === 'idle',
    selectIsFetchDataPending: (state) => state.fetchDataStatus === 'pending',

    selectIsFetchDataIdFulfilled: (state) => state.fetchDataStatus === 'fulfilled',
    selectIsFetchDataFulfilled: (state) => state.fetchDataStatus === 'fulfilled',

    selectTicketsSearchId: (state) => state.searchId,
    selectTicketsSearchComplete: (state) => state.entities.searchComplete,

    selectIsError: (state) => state.error,

    selectTicketsData: (state) => state.entities.tickets,
    selectIsLoading: (state) => state.isLoading,
  },
})

export const selectIsFetchDataFulfilled = ticketsSlice.selectors.selectIsFetchDataFulfilled
export const selectIsLoading = ticketsSlice.selectors.selectIsLoading
export const selectTicketsData = ticketsSlice.selectors.selectTicketsData
export const selectIsError = ticketsSlice.selectors.selectIsError

export const setTicketsData = ticketsSlice.actions.setTicketsData
export const setIsLoading = ticketsSlice.actions.setIsLoading
export const setError = ticketsSlice.actions.setError

export const selectFilteredTickets = createSelector(
  [selectTicketsData, selectCheckboxes],
  (ticketsData, checkboxes) => {
    return ticketsData.filter((ticket) => {
      if (checkboxes.all) return true

      const isAnyCheckboxesDisable = Object.values(checkboxes).some((value) => value)
      if (!isAnyCheckboxesDisable) return false

      const [outboundSegment, returnSegment] = ticket.segments
      const outboundTransfers = outboundSegment.stops.length
      const returnTransfers = returnSegment.stops.length
      const { withoutTransfers, oneTransfers, twoTransfers, threeTransfers } = checkboxes

      const transferConditions = [
        { active: withoutTransfers, count: 0 },
        { active: oneTransfers, count: 1 },
        { active: twoTransfers, count: 2 },
        { active: threeTransfers, count: 3 },
      ]

      return transferConditions.some(({ active, count }) => {
        if (!active) return false
        return (
          (outboundTransfers === count && returnTransfers <= count) ||
          (returnTransfers === count && outboundTransfers <= count)
        )
      })
    })
  }
)

export const selectSortedTickets = createSelector([selectFilteredTickets, selectActiveTab], (filteredTickets, tab) => {
  return filteredTickets.toSorted((a, b) => {
    const [outboundSegmentA, returnSegmentA] = a.segments
    const [outboundSegmentB, returnSegmentB] = b.segments

    const totalDurationA = outboundSegmentA.duration + returnSegmentA.duration
    const totalDurationB = outboundSegmentB.duration + returnSegmentB.duration

    switch (tab) {
      case 'cheapest':
        return a.price - b.price
      case 'fastest':
        return totalDurationA - totalDurationB
      case 'optimal': {
        const priceDiff = a.price - b.price
        return priceDiff !== 0 ? priceDiff : totalDurationA - totalDurationB
      }
      default:
        return 0
    }
  })
})
