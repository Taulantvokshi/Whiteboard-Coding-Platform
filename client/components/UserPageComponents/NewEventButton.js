import React from 'react'
import {edit} from '../../store/clickStore'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const NewEventButton = ({status}) => {
  const navigation = document.querySelector('.navigation')
  return (
    <div className="user_toolbar__button">
      <Link
        onClick={() => {
          navigation.style.zIndex = '1'
          status('new')
        }}
        to="/home/modal"
        className="user_toolbar__button"
      >
        <h3>New Event</h3>
      </Link>
    </div>
  )
}

const dispatchState = dispatch => {
  return {
    status: val => {
      dispatch(edit(val))
    }
  }
}

export default connect(null, dispatchState)(NewEventButton)
