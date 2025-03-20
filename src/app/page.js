'use client'
import dynamic from 'next/dynamic'

import useOnlineStatus from '../shared/hooks/useOnlineStatus'
export const TicketsSearch = dynamic(() => import('../features/TicketsSearch/TicketsSearch'), { ssr: false })

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
