import { useState } from 'react'

import styles from './TransferFilter.module.scss'

const TransferFilter = () => {
  const TransferFilterOptions = [
    { value: 'Все', label: 'all' },
    { value: 'Без пересадок', label: 'withoutTransfers' },
    { value: '1 пересадка', label: 'oneTransfers' },
    { value: '2 пересадки', label: 'twoTransfers' },
    { value: '3 пересадки', label: 'threeTransfers' },
  ]
  const [filterOptions, setFilterOptions] = useState(TransferFilterOptions)
  const [selectedFilter, setSelectedFilter] = useState([])
  return (
    <fieldset className={styles['transfer-filter']}>
      <h5 className={styles['transfer-filter-title']}>Количество пересадок</h5>
      <ul className={styles['transfer-filter-list']}>
        {filterOptions.map((option) => {
          const id = `transfer-filter-${option.label}`
          return (
            <li key={option.label} className={styles['transfer-filter-list-item']}>
              <input
                className={styles['transfer-filter-list-item-checkbox']}
                id={id}
                value={option.value}
                // onChange={() => handleFilterChange(option.value)}
                type="checkbox"
              />
              <label htmlFor={id} className={selectedFilter ? 'active' : ''}>
                {option.value}
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default TransferFilter
