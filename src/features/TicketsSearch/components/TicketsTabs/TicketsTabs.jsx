import { useDispatch, useSelector } from 'react-redux'

import { setActiveTab, selectActiveTab } from '../../slices/filtersTickets.slice'
import { selectIsLoading } from '../../slices/ticketsData.slice'
import TicketsList from '../TicketsList/TicketsList'
import { Loader } from '../../../../shared/ui/components/loader'

import styles from './TicketsTabs.module.scss'

const TicketsTabs = () => {
  const tabList = [
    { title: 'самый дешевый', value: 'cheapest' },
    { title: 'самый быстрый', value: 'fastest' },
    { title: 'оптимальный', value: 'optimal' },
  ]

  const dispatch = useDispatch()
  const activeTab = useSelector(selectActiveTab)
  const loading = useSelector(selectIsLoading)

  return (
    <div className={styles.tabs}>
      <ul className={styles['tabs-list']} role="tablist">
        {tabList.map((tab) => {
          return (
            <li className={styles['tabs-list-item']} key={tab.value} role="presentation">
              <button
                className={`
                  ${styles['tabs-list-btn']} 
                  ${activeTab === tab.value ? styles['tabs-list-btn-active'] : ''} 
                  ${tab.value === 'cheapest' ? styles['tabs-list-btn-first'] : ''} 
                  ${tab.value === 'optimal' ? styles['tabs-list-btn-last'] : ''} `}
                role="tab"
                aria-selected={activeTab === tab.value}
                onClick={() => dispatch(setActiveTab(tab.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(setActiveTab(tab.value))
                  }
                }}
                tabIndex={activeTab === tab.value ? 0 : -1}>
                {tab.title}
              </button>
            </li>
          )
        })}
      </ul>
      {loading ? <Loader className={styles['tabs-list-loader']} /> : <TicketsList />}
    </div>
  )
}

export default TicketsTabs
