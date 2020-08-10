import React from 'react'
import {SinglePerson, Loader} from '../../components'
import {connect} from 'react-redux'

const EventAttendees = ({allAttendies}) => {
  return Object.keys(allAttendies).length ? (
    <div className="event-attendees">
      <div className="event-attendees_info">
        <h2>Attendies({allAttendies.Users.length})</h2>
        <div className="event-attendees_info-link">
          <h3>See all</h3>
        </div>
      </div>

      <div className="event-attendees_people">
        {allAttendies.Users.map(user => {
          return <SinglePerson key={user.id} users={{user}} />
        })}
      </div>
    </div>
  ) : (
    <div className="event-attendees">
      <Loader backgroundColor="#f6f7f8" height="100%" width="100%" />
    </div>
  )
}

const mapStateToProps = store => {
  return {
    allAttendies: store.host.joinedEvents
  }
}

export default connect(mapStateToProps)(EventAttendees)
