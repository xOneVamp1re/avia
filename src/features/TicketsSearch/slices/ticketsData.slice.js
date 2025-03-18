import { v4 as uuidv4 } from 'uuid'

import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

const ticketAdapter = createEntityAdapter({
  selectId: (ticket) => ticket.id,
})

const initialState = ticketAdapter.getInitialState({})

const initialTicketsData = {
  entities: {
    tickets: [],
    filteredTickets: [],
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

export const fetchTicketsById = createAsyncThunk(
  'tickets/fetchData',
  async (id, { extra }) => {
    const response = await extra.api.getTicketsData(id)
    const ticketsWithId = response.tickets.map((ticket) => {
      return { ...ticket, id: uuidv4() }
    })

    return { ...response, tickets: ticketsWithId }
  },
  {
    condition: (params, { getState }) => {
      const searchId = ticketsSlice.selectors.selectTicketsSearchId(getState())
      // const isIdle = ticketsSlice.selectors.selectIsFetchDataIdle(getState())
      const searchCompleted = ticketsSlice.selectors.selectTicketsSearchComplete(getState())
      if (params && searchCompleted) return false
      // if (params && !isIdle) return false
      if (searchId !== params) return false
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
    setFilteredTickets: (state, action) => {
      state.entities.filteredTickets = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTicketsById.pending, (state) => {
      state.fetchDataStatus = 'pending'
    }),
      builder.addCase(fetchTicketsById.fulfilled, (state, action) => {
        state.fetchDataStatus = 'fulfilled'
        state.entities.tickets = action.payload.tickets
        state.entities.searchComplete = action.payload.stop
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
    selectData: (state) => state,
    selectTicketsSearchId: (state) => state.searchId,
    selectTicketsSearchComplete: (state) => state.entities.searchComplete,
    selectTicketsData: (state) => state.entities.tickets,
    selectIsLoading: (state) => state.isLoading,
    /* selectFilteredTicketsData: createSelector(
      (state) => state.entities.tickets,
      (_, tab) => tab,

      (tickets, tab) =>
        tickets.toSorted((a, b) => {
          if (tab === 'cheapest') return a.price - b.price
          if (tab === 'fastest') {
            const [outboundSegmentA, returnSegmentA] = a.segments
            const [outboundSegmentB, returnSegmentB] = b.segments
            return (
              outboundSegmentA.duration +
              returnSegmentA.duration -
              (outboundSegmentB.duration + returnSegmentB.duration)
            )
          }
          if (tab === 'optimal') {
            const [outboundSegmentA, returnSegmentA] = a.segments
            const [outboundSegmentB, returnSegmentB] = b.segments
            const priceDifference = a.price - b.price
            if (priceDifference !== 0) {
              return priceDifference
            }
            return (
              outboundSegmentA.duration +
              returnSegmentA.duration -
              (outboundSegmentB.duration + returnSegmentB.duration)
            )
          }
        })
    ), */
    selectFilteredTicketsData: (state) => state.entities.filteredTickets,
  },
})

export const selectIsFetchDataFulfilled = ticketsSlice.selectors.selectIsFetchDataFulfilled
export const selectIsLoading = ticketsSlice.selectors.selectIsLoading
export const selectTicketsData = ticketsSlice.selectors.selectTicketsData
export const selectFilteredTicketsData = ticketsSlice.selectors.selectFilteredTicketsData

export const setTicketsData = ticketsSlice.actions.setTicketsData
export const setFilteredTickets = ticketsSlice.actions.setFilteredTickets
export const setIsLoading = ticketsSlice.actions.setIsLoading
