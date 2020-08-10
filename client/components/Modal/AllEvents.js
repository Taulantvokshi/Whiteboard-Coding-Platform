import React, {useEffect} from 'react'
import {SingleEventModal} from '../../components'
import {connect} from 'react-redux'
import {getEventsThunk} from '../../store/host'
import {Link} from 'react-router-dom'
import {CircleCross} from '../../components/SVG/Icons'

const AllEvents = ({events, getEvents}) => {
  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="events_modal">
      <div className="events_modal_container">
        <div className="events_modal_container-info">
          <Link to="/">
            <CircleCross color="orangered" size="17" />
          </Link>
        </div>
        <div className="events_modal_container-content">
          {events.map(event => {
            return <SingleEventModal key={event.id} event={event} />
          })}
        </div>
      </div>
    </div>
  )
}
const dispachStateToProps = dispatch => {
  return {
    getEvents: () => dispatch(getEventsThunk())
  }
}

const mapStateToProps = store => {
  return {events: store.host.hostEvents}
}
export default connect(mapStateToProps, dispachStateToProps)(AllEvents)
