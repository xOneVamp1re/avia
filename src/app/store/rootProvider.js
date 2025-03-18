'use client'

import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { store } from './store'

export const RootProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

RootProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
