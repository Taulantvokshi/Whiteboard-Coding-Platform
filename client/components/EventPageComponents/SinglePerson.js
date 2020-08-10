import React from 'react'

const SinglePerson = ({users}) => {
  const user = users.user

  return (
    <div className="event-attendees_people__single">
      <div className="event-attendees_people__single--image">
        {user.picture[0] === 'h' ? (
          <img src={user.picture} />
        ) : (
          <img src={`/${user.picture}`} />
        )}
      </div>
      <div className="event-attendees_people__single--userInfo">
        <p>{user.firstName}</p>
      </div>
      <div className="event-attendees_people__single--userInfo">
        <p style={{color: '#738598'}}>Attendie</p>
      </div>
    </div>
  )
}

export default SinglePerson
