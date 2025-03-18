import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import {
  selectTicketsData,
  setTicketsData,
  setFilteredTickets,
  selectIsFetchDataFulfilled,
  setIsLoading,
  selectFilteredTicketsData,
} from './ticketsData.slice'

const initialFilters = {
  selectedTab: 'cheapest',
  selectedCheckboxes: [],
}

/* export const selectSortedData = () => async (dispatch, getState) => {
  const ticketsData = selectTicketsData(getState())
  const tab = filtersSlice.selectors.selectActiveTab(getState())
  const fulfilled = selectIsFetchDataFulfilled(getState())
  if (fulfilled && ticketsData.length !== 0) {
    dispatch(setIsLoading(true))

    const sortedData = ticketsData.toSorted((a, b) => {
      if (tab === 'cheapest') return a.price - b.price
      if (tab === 'fastest') {
        const [outboundSegmentA, returnSegmentA] = a.segments
        const [outboundSegmentB, returnSegmentB] = b.segments
        return (
          outboundSegmentA.duration + returnSegmentA.duration - (outboundSegmentB.duration + returnSegmentB.duration)
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
          outboundSegmentA.duration + returnSegmentA.duration - (outboundSegmentB.duration + returnSegmentB.duration)
        )
      }
    })
    dispatch(setTicketsData(sortedData))
    dispatch(setIsLoading(false))
  }
} */
/* export const selectSortedData = () => async (dispatch, getState) => {
  const state = getState()
  const tab = filtersSlice.selectors.selectActiveTab(state)
  const fulfilled = selectIsFetchDataFulfilled(state)
  const ticketsData = selectTicketsData(state)

  if (fulfilled && ticketsData.length !== 0) {
    dispatch(setIsLoading(true))
    const sortedTicketsData = selectFilteredTicketsData(state, tab)
    console.log(sortedTicketsData)
    dispatch(setFilteredTickets(sortedTicketsData))
    dispatch(setIsLoading(false))
  }
} */
export const selectSortedData = () => async (dispatch, getState) => {
  const ticketsData = selectTicketsData(getState())
  const tab = filtersSlice.selectors.selectActiveTab(getState())
  if (ticketsData.length !== 0) {
    dispatch(setIsLoading(true))

    const sortedData = ticketsData.toSorted((a, b) => {
      if (tab === 'cheapest') return a.price - b.price
      if (tab === 'fastest') {
        const [outboundSegmentA, returnSegmentA] = a.segments
        const [outboundSegmentB, returnSegmentB] = b.segments
        return (
          outboundSegmentA.duration + returnSegmentA.duration - (outboundSegmentB.duration + returnSegmentB.duration)
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
          outboundSegmentA.duration + returnSegmentA.duration - (outboundSegmentB.duration + returnSegmentB.duration)
        )
      }
    })
    dispatch(setFilteredTickets(sortedData))
    dispatch(setIsLoading(false))
  }
}
// const checkboxes = filtersSlice.selectors.selectActiveCheckboxes(getState())
export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    setActiveTab(state, action) {
      console.log(action)
      state.selectedTab = action.payload
    },
    /*    setSelectedCheckboxes(state, action) {
      state.selectedCheckboxes = action.payload
    }, */
  },
  selectors: {
    selectActiveTab: (state) => state.selectedTab,
  },
})

export const { setActiveTab } = filtersSlice.actions
export const { selectActiveTab } = filtersSlice.selectors
