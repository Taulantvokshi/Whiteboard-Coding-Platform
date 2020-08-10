import React, {useEffect, useState} from 'react'
import {UserYourSingleEvents, Loader} from '../../components'
import {getYourEventsThunk} from '../../store/host'
import {connect} from 'react-redux'

const UserCreatedEvents = ({yourEventsThunk, yourEvents}) => {
  const [isData, setData] = useState(true)

  useEffect(
    () => {
      yourEventsThunk()
    },
    [yourEvents.length]
  )

  setTimeout(() => {
    if (!yourEvents.length) {
      setData(false)
    }
  }, 400)

  return yourEvents.length ? (
    <div className="user_joinedEvents__display-yourEvent">
      {yourEvents.map(event => {
        return <UserYourSingleEvents key={event.id} event={event} />
      })}
    </div>
  ) : isData ? (
    <Loader backgroundColor="white" width="100%" height="6rem" />
  ) : (
    <div className="no-events">
      <h5>No Events...</h5>
    </div>
  )
}

const dispatchState = dispatch => {
  return {
    yourEventsThunk: () => dispatch(getYourEventsThunk())
  }
}

const mapStateToProps = store => {
  return {
    yourEvents: store.host.yourEvents
  }
}

export default connect(mapStateToProps, dispatchState)(UserCreatedEvents)
