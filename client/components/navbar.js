import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {UploadPictureButtonconst, SearchComponent} from '../components'
import {logout} from '../store'
import {Search, Exit} from './SVG/Icons'

const Navbar = ({user, handleClick, isLoggedIn, toogleSearch}) => {
  const [clicked, setClicked] = useState(false)

  useEffect(
    () => {
      if (toogleSearch) {
        setClicked(false)
      }
    },
    [toogleSearch]
  )

  return (
    <div className="navigation">
      <div className="navigation_logo">
        <Link className="logo-text" to="/main">
          <h1 style={{cursor: 'pointer'}}>WHITEBOARD</h1>
        </Link>
      </div>

      <div className="navigation_options">
        {isLoggedIn ? (
          <div className="navigation_options-online">
            <div onClick={() => setClicked(true)} className="responsive_search">
              <Search />
              <div
                className="responsive_search-container"
                style={{
                  width: clicked ? '100vw' : '0',
                  visibility: clicked ? 'visible' : 'hidden',
                  opacity: clicked ? '1' : '0'
                }}
              >
                <div className="responsive_search-container--search">
                  <div
                    onClick={e => {
                      e.stopPropagation()
                      setClicked(false)
                    }}
                    className="responsive_search-container--search-exit"
                  >
                    <Exit />
                  </div>
                  <SearchComponent />
                </div>
              </div>
            </div>
            <div className="addUser">
              <img className="addUser_image" src={user.picture} />
              <div className="addUser_addImage">
                <UploadPictureButtonconst />
              </div>
            </div>

            <div className="navigation_options-online--links">
              <Link id="login-link" to="/home">
                Home
              </Link>
              <div id="home-link" onClick={() => handleClick()}>
                Logout
              </div>
            </div>
          </div>
        ) : (
          <div className="navigation_options-online--links">
            <Link id="login-link" to="/login">
              Login
            </Link>
            <Link id="home-link" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    coordinates: state.clickStore.test,
    toogleSearch: state.clickStore.toogleSearch
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
