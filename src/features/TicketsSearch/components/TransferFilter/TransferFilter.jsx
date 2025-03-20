'use client'

import { useState, useRef } from 'react'

import { useOutsideClick } from '../../../../shared/hooks/useOutsideClick'
import { useWindowSize } from '../../../../shared/hooks/useWindowSize'

import { TransferFilterList } from './TransferFilterList'
import styles from './TransferFilter.module.scss'

const TransferFilter = () => {
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  const listRef = useRef(null)
  useOutsideClick(listRef, () => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 50)
    }
  })

  const toggleListMobile = () => {
    setIsOpen(!isOpen)
  }

  return (
    <fieldset className={styles['transfer-filter']}>
      {width >= 768 && <h5 className={styles['transfer-filter-title']}>Количество пересадок</h5>}
      {width <= 767 && (
        <button
          className={`${styles['transfer-filter-title']} ${isOpen ? styles['transfer-filter-title-active'] : ''} `}
          onClick={toggleListMobile}>
          Пересадки
        </button>
      )}
      {(width <= 767 && isOpen) || width >= 768 ? <TransferFilterList ref={listRef} /> : null}
    </fieldset>
  )
}

export default TransferFilter
