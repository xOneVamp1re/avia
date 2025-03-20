import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { toggleCheckboxes, toggleAllCheckboxes, selectCheckboxes } from '../../slices/filtersTickets.slice'

import styles from './TransferFilter.module.scss'

export const TransferFilterList = ({ ref, isOpen }) => {
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
    <ul
      className={`${styles['transfer-filter-list']} ${isOpen ? styles['transfer-filter-list-active'] : ''}`}
      ref={ref}>
      {transferOptions.map((option) => {
        const id = `transfer-filter-${option.value}`
        return (
          <li key={id} className={styles['transfer-filter-list-item']}>
            <input
              className={styles['transfer-filter-list-item-checkbox']}
              id={id}
              onChange={() => handleCheckboxClick(option.value)}
              type="checkbox"
              checked={checkboxes[option.value] || false}
            />
            <label htmlFor={id} className={styles['transfer-filter-list-item-label']}>
              {option.label}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

TransferFilterList.propTypes = {
  ref: PropTypes.object,
  isOpen: PropTypes.bool,
}
