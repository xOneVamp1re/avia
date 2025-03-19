import TransferFilter from './components/TransferFilter/TransferFilter'
import TicketsTabs from './components/TicketsTabs/TicketsTabs'
import styles from './TicketsSearch.module.scss'
import { useTicketsData } from './hooks/useTicketsData'

const TicketsSearch = () => {
  useTicketsData()

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
