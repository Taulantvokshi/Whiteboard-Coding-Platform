import React, {useEffect} from 'react'
import {eventThunk, joinedThunk} from '../store/host'
import {connect} from 'react-redux'

import {
  EventAttendees,
  EventHeader,
  EventInfo,
  EventDetails,
  EventComments,
  Loader
} from '../components'

const EventPage = ({match, user, allAttendies, status}) => {
  const id = match.params.id
  const didUserJoined = user.events.find(item => item === id)

  useEffect(() => {
    status(id)
    window.scrollTo(0, 0)
  }, [])

  const event = allAttendies
  return Object.keys(event).length ? (
    <div className="event-container">
      <EventHeader status={didUserJoined} event={event} />
      <EventDetails details={event.details} />
      <EventInfo event={event} />
      <EventAttendees eventId={event.id} />
      <EventComments />
      {/* <HomeFooter /> */}
    </div>
  ) : (
    <Loader height="100vh" width="100vw" />
  )
}

const mapStateToProps = store => {
  return {
    user: store.user,
    event: store.host.event,
    allAttendies: store.host.joinedEvents
  }
}

const dispachProps = dispatch => {
  return {
    getEvent: id => dispatch(eventThunk(id)),
    status: id => dispatch(joinedThunk(id))
  }
}

export default connect(mapStateToProps, dispachProps)(EventPage)
