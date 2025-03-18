import { convertTime } from '@/shared/utils/convertTime'
import { getStopText } from '@/shared/utils/getStops'

import styles from './TicketCard.module.scss'

const TicketCard = ({ ticket }) => {
  const { id, price, carrier, segments } = ticket
  const [outboundSegment, returnSegment] = segments

  return (
    <article className={styles['ticket-card']}>
      <div className={styles['ticket-card-header']}>
        <span className={styles['ticket-card-price']}>{price} P</span>
        <img className={styles['ticket-card-img']} src={`//pics.avs.io/99/36/${carrier}.png`} />
      </div>
      <div className={styles['ticket-card-body']}>
        <div className={styles['ticket-card-info']}>
          {' '}
          <div className={styles['ticket-card-airport-info']}>
            <span
              className={
                styles['ticket-card-info-title']
              }>{`${outboundSegment.origin}-${outboundSegment.destination}`}</span>
            <div className={styles['ticket-card-flight-time']}>
              <span className={styles['ticket-card-info-desc']}>10:00-12:00</span>
            </div>
          </div>
          <div className={styles['ticket-card-duration-info']}>
            <span className={styles['ticket-card-info-title']}>в пути</span>
            <span className={styles['ticket-card-info-desc']}>{convertTime(outboundSegment.duration)}</span>
          </div>
          <div className={styles['ticket-card-transfers-info']}>
            <span className={styles['ticket-card-info-title']}>{getStopText(outboundSegment.stops)}</span>
            <span className={styles['ticket-card-info-desc']}>{outboundSegment.stops.join(', ')}</span>
          </div>
        </div>
        <div className={styles['ticket-card-info']}>
          <div className={styles['ticket-card-airport-info']}>
            <span
              className={
                styles['ticket-card-info-title']
              }>{`${returnSegment.origin}-${returnSegment.destination}`}</span>
            <div className={styles['ticket-card-flight-time']}>
              <span className={styles['ticket-card-info-desc']}>10:00-12:00</span>
            </div>
          </div>
          <div className={styles['ticket-card-duration-info']}>
            <span className={styles['ticket-card-info-title']}>в пути</span>
            <span className={styles['ticket-card-info-desc']}>{convertTime(returnSegment.duration)}</span>
          </div>
          <div className={styles['ticket-card-transfers-info']}>
            <span className={styles['ticket-card-info-title']}>{getStopText(returnSegment.stops)}</span>
            <span className={styles['ticket-card-info-desc']}>{returnSegment.stops.join(', ')}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TicketCard
