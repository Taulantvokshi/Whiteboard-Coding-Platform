import React from 'react'
import {Link, Route} from 'react-router-dom'
import {UserCreatedEvents, UserCurrentEvents} from '../../components'
import history from '../../history'
const UserJoinedEvents = () => {
  const colorize = (data, char) => {
    const arr = data.split('/')

    if (arr.length > 2) {
      if (arr[2][0] === char) {
        return '#ea7659'
      } else {
        return '#696464'
      }
    } else {
      return '#696464'
    }
  }
  return (
    <div className="user_joinedEvents">
      <nav className="user_joinedEvents__navigation">
        <ul className="user_joinedEvents__navigation-list">
          <Link to="/home/your-events">
            <li style={{color: colorize(history.location.pathname, 'y')}}>
              Your events
            </li>
          </Link>
          <Link to="/home/joined-events">
            <li style={{color: colorize(history.location.pathname, 'j')}}>
              Joined events
            </li>
          </Link>
        </ul>
      </nav>
      <div className="user_joinedEvents__display">
        <Route path="/home/your-events" component={UserCreatedEvents} />
        <Route path="/home/joined-events" component={UserCurrentEvents} />
        <Route exact path="/home" component={UserCreatedEvents} />
      </div>
    </div>
  )
}

export default UserJoinedEvents
