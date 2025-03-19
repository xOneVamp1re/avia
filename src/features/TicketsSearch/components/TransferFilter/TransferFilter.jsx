import { useDispatch, useSelector } from 'react-redux'

import { toggleCheckboxes, toggleAllCheckboxes, selectCheckboxes } from '../../slices/filtersTickets.slice'

import styles from './TransferFilter.module.scss'

const TransferFilter = () => {
  const transferOptions = [
    { label: 'Все', value: 'all' },
    { label: 'Без пересадок', value: 'withoutTransfers' },
    { label: '1 пересадка', value: 'oneTransfers' },
    { label: '2 пересадки', value: 'twoTransfers' },
    { label: '3 пересадки', value: 'threeTransfers' },
  ]
  const dispatch = useDispatch()
  const checkboxes = useSelector(selectCheckboxes)

  const handleCheckboxClick = (value) => {
    if (value === 'all') {
      dispatch(toggleAllCheckboxes())
    } else {
      dispatch(toggleCheckboxes(value))
    }
  }
  return (
    <fieldset className={styles['transfer-filter']}>
      <h5 className={styles['transfer-filter-title']}>Количество пересадок</h5>
      <ul className={styles['transfer-filter-list']}>
        {transferOptions.map((option) => {
          const id = `transfer-filter-${option.value}`
          return (
            <li key={id} className={styles['transfer-filter-list-item']}>
              <input
                className={styles['transfer-filter-list-item-checkbox']}
                id={id}
                onChange={() => handleCheckboxClick(option.value)}
                type="checkbox"
                checked={checkboxes[option.value]}
              />
              <label
                htmlFor={id}
                className={styles['transfer-filter-list-item-label']} /* className={selectedFilter ? 'active' : ''} */
              >
                {option.label}
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default TransferFilter
