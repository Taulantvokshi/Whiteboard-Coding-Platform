import React, {useState, useEffect, Fragment} from 'react'
import {NewEventButton, SearchComponent} from '../../components'

const UserToolbar = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(
    () => {
      window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
      })
    },
    [width]
  )

  return (
    <div className="user_toolbar">
      {width > 600 ? (
        <Fragment>
          <SearchComponent />
          <NewEventButton />
        </Fragment>
      ) : (
        <NewEventButton />
      )}
    </div>
  )
}

export default UserToolbar
