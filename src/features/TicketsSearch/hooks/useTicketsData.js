import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ticketsSlice, fetchTicketsById, fetchTicketsId } from '../slices/ticketsData.slice'

export const useTicketsData = () => {
  const dispatch = useDispatch()
  const searchId = useSelector(ticketsSlice.selectors.selectTicketsSearchId)

  useEffect(() => {
    dispatch(fetchTicketsId())
  }, [dispatch])

  useEffect(() => {
    if (searchId) dispatch(fetchTicketsById(searchId))
  }, [searchId])
}
