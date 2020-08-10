import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {yourjoinedEventsThunk} from '../../store/clickStore'
import {UserSingleCurrentEvent, Loader} from '../../components'
const UserCurrentEvents = ({joinedEvents, events}) => {
  const [isData, setData] = useState(true)

  useEffect(
    () => {
      joinedEvents()
    },
    [events.length]
  )

  setTimeout(() => {
    if (!events.length) {
      setData(false)
    }
  }, 400)

  return events.length ? (
    <div className="user_joinedEvents__display-currentEvents">
      {events.map(event => {
        return <UserSingleCurrentEvent event={event} key={event.id} />
      })}
    </div>
  ) : isData ? (
    <Loader backgroundColor="white" width="100%" height="6rem" />
  ) : (
    <div className="no-events">
      <h5>No joined events yet...</h5>
    </div>
  )
}

const dispatchProps = dispatch => {
  return {joinedEvents: () => dispatch(yourjoinedEventsThunk())}
}
const mapStateToProps = store => {
  return {events: store.clickStore.joinedEvents}
}
export default connect(mapStateToProps, dispatchProps)(UserCurrentEvents)
