import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store'

const HomeFooter = ({user, userLogout}) => {
  return (
    <div className="home_footer">
      <div className="home_footer-box">
        {user.id ? (
          <ul className="home_footer-list">
            <li onClick={userLogout} className="home_footer-list--items">
              Logout
            </li>
            <Link to="/">
              <li className="home_footer-list--items">About Us</li>
            </Link>
            <Link to="/">
              <li className="home_footer-list--items">Home</li>
            </Link>
          </ul>
        ) : (
          <ul className="home_footer-list">
            <Link to="/login">
              <li className="home_footer-list--items">LogIn</li>
            </Link>
            <Link to="/signup">
              <li className="home_footer-list--items">SignUp</li>
            </Link>
            <Link to="/">
              <li className="home_footer-list--items">About Us</li>
            </Link>
            <Link to="/">
              <li className="home_footer-list--items">Home</li>{' '}
            </Link>
          </ul>
        )}
      </div>
      <div className="home_footer-creator">
        <div className="socialMedia">
          <i className="fab fa-twitter" />
          <i className="fab fa-instagram" />
          <i className="fab fa-facebook-square" />
        </div>
      </div>
      <a
        href="https://www.linkedin.com/in/taulant-vokshi/"
        style={{textDecoration: 'none'}}
      >
        <h5 style={{marginBottom: '1rem', color: 'black'}}>
          created by taulant vokshi
        </h5>
      </a>
    </div>
  )
}

const disptchStateToProps = dispach => {
  return {userLogout: () => dispach(logout())}
}
const mapStateToProps = store => {
  return {user: store.user}
}
export default connect(mapStateToProps, disptchStateToProps)(HomeFooter)
