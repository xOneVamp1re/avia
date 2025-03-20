import { useState } from 'react'
import { useSelector } from 'react-redux'

import { selectSortedTickets, selectIsError } from '../../slices/ticketsData.slice'
import checkForErrors from '../../../../shared/utils/checkForErrors'
import TicketCard from '../TicketCard/TicketCard'

import styles from './TicketsList.module.scss'

const TicketsList = () => {
  const [visibleTickets, setVisibleTickets] = useState(5)
  const sortedTickets = useSelector(selectSortedTickets)
  const isError = useSelector(selectIsError)

  const hasTickets = sortedTickets.length > 0

  const loadMoreTickets = () => {
    setVisibleTickets((prev) => prev + 5)
  }

  if (isError) return <p className={styles['tickets-list-not-results']}>{checkForErrors(isError)}</p>
  if (!hasTickets) return <p className={styles['tickets-list-not-results']}>Билетов по вашему запросу не найдено.</p>

  return (
    <>
      <ul className={styles['tickets-list']}>
        {sortedTickets.slice(0, visibleTickets).map((ticket) => {
          return <TicketCard key={ticket.id} ticket={ticket}></TicketCard>
        })}
      </ul>
      <button className={styles['tickets-list-btn-show-more']} onClick={loadMoreTickets}>
        Показать еще 5 билетов
      </button>
    </>
  )
}

export default TicketsList
