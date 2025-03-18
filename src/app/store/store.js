import { configureStore } from '@reduxjs/toolkit'

import { api } from '../../shared/api/api'
import { ticketsSlice } from '../../features/TicketsSearch/slices/ticketsData.slice'
import { filtersSlice } from '../../features/TicketsSearch/slices/filtersTickets.slice'
const extraArgument = {
  api,
}

export const store = configureStore({
  reducer: {
    [ticketsSlice.name]: ticketsSlice.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
})
