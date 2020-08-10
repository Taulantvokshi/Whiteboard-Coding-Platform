import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {MapContainer} from '../../components'
import {getEventsThunk} from '../../store/host'
const HomeMap = props => {
  useEffect(
    () => {
      props.displayEvents()
    },
    [props.eventData.length]
  )
  return (
    <div className="home_map">
      <div className="home_map-display">
        <MapContainer locations={props.eventData} />
      </div>
    </div>
  )
}

const dispatchStateToProps = dispatch => {
  return {
    displayEvents: () => dispatch(getEventsThunk())
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    eventData: state.host.hostEvents,
    error: state.host.error
  }
}

export default connect(mapState, dispatchStateToProps)(HomeMap)
