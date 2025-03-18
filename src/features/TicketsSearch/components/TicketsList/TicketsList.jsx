import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ticketsSlice, selectFilteredTicketsData } from '../../slices/ticketsData.slice'
import TicketCard from '../TicketCard/TicketCard'

import styles from './TicketsList.module.scss'

const TicketsList = () => {
  const [visibleTickets, setVisibleTickets] = useState(5)
  // const tickets = useSelector(ticketsSlice.selectors.selectTicketsData)
  const filteredTickets = useSelector(selectFilteredTicketsData)
  console.log(filteredTickets)
  const loadMoreTickets = () => {
    setVisibleTickets((prev) => prev + 5)
  }

  return (
    <>
      <ul className={styles['tickets-list']}>
        {filteredTickets.slice(0, visibleTickets).map((ticket) => {
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
