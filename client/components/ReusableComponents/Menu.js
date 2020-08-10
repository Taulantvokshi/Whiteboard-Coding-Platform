import React from 'react'
import {logout} from '../../store'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {UploadPictureButtonconst} from '../../components'
const Menu = ({handleClick, isLoggedIn, user}) => {
  return (
    <div className="menu">
      <div className="menu__info">
        {isLoggedIn ? (
          <div className="menu__info-data">
            <div className="menu__info-data--image">
              {user.picture[0] === 'h' ? (
                <img src={user.picture} />
              ) : (
                <img src={`/${user.picture}`} />
              )}
            </div>
            <div className="menu__info-data--list">
              {user.picture[0] !== 'u' ? (
                <div className="menu-items">
                  <UploadPictureButtonconst
                    divClass="menu-addPicture-btn"
                    labelClass="menu-addPicture-label"
                    iconColor="white"
                  />{' '}
                </div>
              ) : (
                ''
              )}

              <div className="className='menu__info-data--list-account menu-items">
                User Account
              </div>
              <div className="className='menu__info-data--list-setings menu-items">
                Setings
              </div>
              <Link
                className="className='menu__info-data--list-home menu-items"
                to="/home/your-events"
              >
                Home
              </Link>
              <div
                onClick={() => handleClick()}
                className="className='menu__info-data--list-logout menu-items"
              >
                Logout
              </div>
              <div className="className='menu__info-data--list-exit menu-items">
                Exit
              </div>
            </div>
          </div>
        ) : (
          <div className="menu__info-data">lalallalala</div>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}
export default connect(mapState, mapDispatch)(Menu)
