import React from 'react'
import {SingleEvent} from '../../components'

import {connect} from 'react-redux'
import {getEventsThunk} from '../../store/host'
import filterEvents from '../../util/filterEvents'

// getEvents was as a prop
const UserEvents = ({events, filterData}) => {
  const newEvents = filterEvents(events, filterData)

  //Checks for expired events by comparing the dates
  // const finalEvents = newEvents.filter(event => {
  //   return (
  //     Number(new Date(event.date + ' ' + event.time).getTime()) >
  //     Number(new Date().getTime())
  //   )
  // })

  return newEvents.length ? (
    <div className="user_events">
      {newEvents.map(event => {
        return <SingleEvent key={event.id} event={event} />
      })}
    </div>
  ) : (
    <div className="noUser_events">
      <h5>No Events..</h5>
    </div>
  )
}

const dispachStateToProps = dispatch => {
  return {
    getEvents: () => dispatch(getEventsThunk())
  }
}
const mapPropsToState = store => {
  return {
    events: store.host.hostEvents,
    filterData: store.clickStore.filterData
  }
}

export default connect(mapPropsToState, dispachStateToProps)(UserEvents)
