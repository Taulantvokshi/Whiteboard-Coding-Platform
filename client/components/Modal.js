import React from 'react'
import ReactDOM from 'react-dom'
import {Event} from '../components'

const Modal = () => {
  return ReactDOM.createPortal(<Event />, document.querySelector('#events'))
}

export default Modal
