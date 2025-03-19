import PropTypes from 'prop-types'

import { TicketCardInfo } from './TicketCardInfo'
import styles from './TicketCard.module.scss'

const TicketCard = ({ ticket }) => {
  const { price, carrier, segments } = ticket
  const [outboundSegment, returnSegment] = segments

  return (
    <article className={styles['ticket-card']}>
      <div className={styles['ticket-card-header']}>
        <span className={styles['ticket-card-price']}>{price} P</span>
        <img
          className={styles['ticket-card-img']}
          src={`//pics.avs.io/99/36/${carrier}.png`}
          alt="carrier company logo"
        />
      </div>
      <div className={styles['ticket-card-body']}>
        <TicketCardInfo segment={outboundSegment} />
        <TicketCardInfo segment={returnSegment} />
      </div>
    </article>
  )
}

export default TicketCard

TicketCard.propTypes = {
  ticket: PropTypes.object,
}
