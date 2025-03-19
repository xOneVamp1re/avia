import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ticketsSlice, fetchTicketsById, fetchTicketsId } from '../slices/ticketsData.slice'

export const useTicketsData = () => {
  const dispatch = useDispatch()
  const searchId = useSelector(ticketsSlice.selectors.selectTicketsSearchId)
  const searchComplete = useSelector(ticketsSlice.selectors.selectTicketsSearchComplete)

  useEffect(() => {
    dispatch(fetchTicketsId())
  }, [dispatch])

  useEffect(() => {
    if (searchId) dispatch(fetchTicketsById(searchId))
  }, [searchId])

  useEffect(() => {
    if (!searchId || searchComplete) return

    const interval = setInterval(() => {
      dispatch(fetchTicketsById(searchId))
    }, 1000)

    return () => clearInterval(interval)
  }, [searchId, searchComplete, dispatch])
}
