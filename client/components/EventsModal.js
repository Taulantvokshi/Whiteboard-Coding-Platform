import React from 'react'
import ReactDOM from 'react-dom'
import {AllEvents} from '../components'

const Modal = () => {
  return ReactDOM.createPortal(<AllEvents />, document.querySelector('#modal'))
}

export default Modal
