'use client'

import useOnlineStatus from '../shared/hooks/useOnlineStatus'
import TicketsSearch from '../features/TicketsSearch/TicketsSearch'

export default function Home() {
  const isOnline = useOnlineStatus()

  return isOnline ? (
    <>
      <TicketsSearch />
    </>
  ) : (
    <p
      style={{
        margin: '0 auto',
        textAlign: 'center',
        fontSize: '1.5rem',
        marginTop: '2rem',
      }}>
      Вы оффлайн. Пожалуйста, проверьте ваше соединение.
    </p>
  )
}
