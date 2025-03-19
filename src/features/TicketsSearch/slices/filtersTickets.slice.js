import { createSlice } from '@reduxjs/toolkit'

const initialFilters = {
  activeTab: 'cheapest',
  selectedCheckboxes: {
    all: true,
    withoutTransfers: true,
    oneTransfers: true,
    twoTransfers: true,
    threeTransfers: true,
  },
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload
    },
    toggleCheckboxes(state, action) {
      const { payload } = action
      state.selectedCheckboxes[payload] = !state.selectedCheckboxes[payload]
      const allChecked = Object.entries(state.selectedCheckboxes)
        .filter(([key]) => key !== 'all')
        .every(([, value]) => value)

      state.selectedCheckboxes.all = allChecked
    },
    toggleAllCheckboxes(state) {
      const valueAll = !state.selectedCheckboxes.all
      Object.keys(state.selectedCheckboxes).forEach((key) => {
        state.selectedCheckboxes[key] = valueAll
      })
    },
  },
  selectors: {
    selectActiveTab: (state) => state.activeTab,
    selectCheckboxes: (state) => state.selectedCheckboxes,
  },
})

export const { setActiveTab, toggleCheckboxes, toggleAllCheckboxes } = filtersSlice.actions
export const { selectActiveTab, selectCheckboxes } = filtersSlice.selectors
