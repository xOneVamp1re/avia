import PropTypes from 'prop-types'

import { convertTime } from '../../../../shared/utils/convertTime'
import { getStopText } from '../../../../shared/utils/getStops'
import { flightTimeCalc } from '../../../../shared/utils/flightTimeCalc'

import styles from './TicketCard.module.scss'

export const TicketCardInfo = ({ segment }) => {
  return (
    <div className={styles['ticket-card-info']}>
      <div className={styles['ticket-card-airport-info']}>
        <span className={styles['ticket-card-info-title']}>{`${segment.origin} - ${segment.destination}`}</span>
        <div className={styles['ticket-card-flight-time']}>
          <span className={styles['ticket-card-info-desc']}>{flightTimeCalc(segment.date, segment.duration)}</span>
        </div>
      </div>
      <div className={styles['ticket-card-duration-info']}>
        <span className={styles['ticket-card-info-title']}>в пути</span>
        <span className={styles['ticket-card-info-desc']}>{convertTime(segment.duration)}</span>
      </div>
      <div className={styles['ticket-card-transfers-info']}>
        <span className={styles['ticket-card-info-title']}>{getStopText(segment.stops)}</span>
        <span className={styles['ticket-card-info-desc']}>{segment.stops.join(', ')}</span>
      </div>
    </div>
  )
}

TicketCardInfo.propTypes = {
  segment: PropTypes.object.isRequired,
}
