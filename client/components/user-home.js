import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {
  // MapContainer,
  UserEvents,
  UserToolbar,
  UserJoinedEvents,
  Modal
} from '../components'
import {getEventsThunk} from '../store/host'

const UserHome = props => {
  const eventPage = useRef()
  useEffect(
    () => {
      props.displayEvents()
      if (props.location.pathname === '/home/modal') {
        eventPage.current.style.position = 'fixed'
      } else {
        eventPage.current.style.position = 'relative'
      }
    },
    [props.location.pathname]
  )

  return (
    <div ref={eventPage} className="user-container">
      <UserToolbar />
      <UserJoinedEvents />
      <UserEvents />
      <Route path="/home/modal" component={Modal} />
      <Route path="/home/edit" component={Modal} />
    </div>
  )
}

// AIzaSyBuhIdh6WtyiuUdVpFlxRx2PtS18m2Lki8 google maps
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    eventData: state.host.hostEvents,
    error: state.host.error
  }
}

const dispatchStateToProps = dispatch => {
  return {
    displayEvents: () => dispatch(getEventsThunk())
  }
}

export default connect(mapState, dispatchStateToProps)(UserHome)

/**
 * PROP TYPES
 */
