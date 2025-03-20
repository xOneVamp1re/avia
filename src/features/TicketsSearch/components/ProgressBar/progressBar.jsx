import { useSelector } from 'react-redux'

import { selectTicketsData } from '../../slices/ticketsData.slice'

export const ProgressBar = () => {
  const ticketsDataLength = useSelector(selectTicketsData).length
  const percentProgress = (ticketsDataLength / 10873) * 100

  return (
    percentProgress <= 100 && (
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', position: 'relative' }}>
        <div
          style={{
            width: `${percentProgress}%`,
            height: '40px',
            backgroundColor: '#76c7c0',
            borderRadius: '5px',
            transition: 'width 0.3s ease-in-out',
          }}></div>
        <p style={{ position: 'absolute', top: '10px', left: '10px' }}> Получение всех доступных билетов...</p>
      </div>
    )
  )
}
