import { Open_Sans } from 'next/font/google'
import PropTypes from 'prop-types'

import { RootProvider } from './store/rootProvider'
import '../style/globals.scss'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
  weight: ['400', '600'],
})
export const metadata = {
  title: 'Третий проект',
  description: 'aviasales',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={openSans.variable}>
        <RootProvider> {children}</RootProvider>
        {/* <Provider store={store}>{children}</Provider> */}
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
