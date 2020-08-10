import React from 'react'
import {EventCard} from '../../components'
import {connect} from 'react-redux'

const HomeEvents = ({events}) => {
  return (
    <div className="home_events">
      <div className="home_events-container">
        {events.length
          ? events.slice(-3).map(event => {
              return <EventCard key={event.id} event={event} />
            })
          : 'No Events'}
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {events: store.host.hostEvents}
}

export default connect(mapStateToProps)(HomeEvents)
