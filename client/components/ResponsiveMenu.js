import React from 'react'
import ReactDOM from 'react-dom'
import {Menu} from '../components'

const ResponsiveMenu = () => {
  return ReactDOM.createPortal(<Menu />, document.querySelector('#menu'))
}

export default ResponsiveMenu
