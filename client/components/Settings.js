import React from 'react'
// import {SettingsImageChoper} from '../components'
import {connect} from 'react-redux'

const Settings = () => {
  return (
    <div className="setting-container">
      {/* <SettingsImageChoper userImage={user} /> */}
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(Settings)
