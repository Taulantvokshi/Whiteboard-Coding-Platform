import React from 'react'

const UserAttendiesImages = ({user}) => {
  return (
    <div className="user_events__event-description--attend-attendies-image">
      {user.picture[0] === 'h' ? (
        <img src={user.picture} />
      ) : (
        <img src={`/${user.picture}`} />
      )}
    </div>
  )
}

export default UserAttendiesImages
