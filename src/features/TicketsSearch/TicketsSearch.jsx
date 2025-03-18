import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import checkForErrors from '../../utils/checkForErrors'

import { ticketsSlice, fetchTicketsById, fetchTicketsId } from './slices/ticketsData.slice'
import { filtersSlice } from './slices/filtersTickets.slice'

import TransferFilter from './components/TransferFilter/TransferFilter'
import TicketsTabs from './components/TicketsTabs/TicketsTabs'
import styles from './TicketsSearch.module.scss'

const TicketsSearch = () => {
  const dispatch = useDispatch()
  // const state = useSelector(ticketsSlice.selectors.selectData)
  // const isPending = useSelector(ticketsSlice.selectors.selectIsFetchDataPending)

  const searchId = useSelector(ticketsSlice.selectors.selectTicketsSearchId)
  const searchComplete = useSelector(ticketsSlice.selectors.selectTicketsSearchComplete)
  useEffect(() => {
    dispatch(fetchTicketsId())
  }, [dispatch])
  useEffect(() => {
    if (searchId) dispatch(fetchTicketsById(searchId))
  }, [searchId])

  /*   useEffect(() => {
    const getFullTicketsList = setInterval(() => {
      if (!searchComplete) {
        dispatch(fetchTicketsById(searchId))
      } else clearInterval(getFullTicketsList)
    }, 1000)

    return () => clearInterval(getFullTicketsList)
  }, [searchId, searchComplete]) */

  return (
    <>
      <img className={styles.logo} src="/logo.svg" alt="logo our company" />
      <main className={styles.main}>
        <TransferFilter />
        <TicketsTabs />
      </main>
    </>
  )
}

export default TicketsSearch

/* useEffect(() => {
  const isIdle = ticketsSlice.selectors.selectIsFetchDataIdle(appStore.getState())
  console.log(isIdle)
  if (!isIdle) return

  dispatch(ticketsSlice.actions.fetchDataPending())

  api
    .getSearchId()
    .then((data) => dispatch(ticketsSlice.actions.fetchDataSuccess(data)))
    .catch((error) => dispatch(ticketsSlice.actions.fetchDataFailed(error)))
}, [dispatch, state]) */

/*   useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getTickets = async () => {
      setIsLoading(true)
      try {
        const searchID = await getSearchID(signal)
        if (signal.aborted) return
        !searchID.data && checkForErrors(searchID.error)
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchID.data}`, {
          signal,
        })
        const data = await response.json()
        return setTicketsData(data.tickets)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getTickets()

    return () => {
      abortController.abort()
    }
  }, []) */
