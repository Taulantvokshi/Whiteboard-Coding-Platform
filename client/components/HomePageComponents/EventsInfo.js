import React from 'react'
import {connect} from 'react-redux'

import {Forbes, Times, NycTimes} from '../SVG/Icons'
const HomeEventsInfo = () => {
  return (
    <div className="events_info">
      <div className="events_info_container">
        <div className="events_info_container-creator">
          <div className="events_info_container-creator--image">
            <img src="images/profile.jpg" />
          </div>
          <div className="events_info_container-creator--description">
            <p className="events_info_container-creator--description-text">
              Hi There! <br />
              <br />
              We all struggle when it comes to job interviewing, and especially
              Whiteboard coding. Now i hope it should be a little bit easier.
              Join your group and start practicing.
            </p>
            <p
              className="events_info_container-creator--description-text"
              style={{color: 'grey', marginTop: '5px'}}
            >
              <br />
              Taulant Vokshi Founder.
            </p>
          </div>
        </div>

        <div className="events_info_container-feature">
          <NycTimes color="#e0e0e0" />
          <Forbes color="#e0e0e0" />
          <Times color="#e0e0e0" />
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    events: state.host.hostEvents
  }
}
export default connect(mapState)(HomeEventsInfo)
