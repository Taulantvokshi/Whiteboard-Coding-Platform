import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  let errorMessage = {}
  const {name, displayName, handleSubmit, error} = props
  if (error) {
    errorMessage = error.response.data
  }

  const isUser = names => {
    if (names[0] === 'l') {
      return 'none'
    } else {
      return 'inline-block'
    }
  }

  return (
    <div className="login">
      <div className="login__form">
        <div className="login__form--box">
          <form onSubmit={handleSubmit} name={name}>
            <div className="login__form--info">
              <input
                style={{
                  display: isUser(name),
                  border: errorMessage.firstName ? '2px solid #ff8a5c' : ''
                }}
                className="login__form--input"
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <input
                style={{
                  display: isUser(name),
                  border: errorMessage.lastName ? '2px solid #ff8a5c' : ''
                }}
                className="login__form--input"
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
              <input
                style={{border: errorMessage.email ? '2px solid #ff8a5c' : ''}}
                className="login__form--input"
                name="email"
                type="text"
                placeholder="Email"
              />
              {/* <label htmlFor="password">
                <small>Password</small>
              </label> */}
              <input
                style={{
                  border: errorMessage.password ? '2px solid #ff8a5c' : ''
                }}
                className="login__form--input"
                name="password"
                placeholder="Password"
                type="password"
              />

              <h5 style={{marginBottom: '1rem', color: '#e25822'}}>
                {typeof (error && error.response.data) === 'string'
                  ? error.response.data
                  : Object.values(errorMessage)[0]}
              </h5>
              {/* <a className="login__form--google" href="/auth/google">
                {displayName} with Google
              </a> */}
            </div>
            <button className="login__form--button" type="submit">
              {displayName}
            </button>
            <div
              className="guestButton"
              onClick={() => {
                props.guest('john@gmail.com', '123456', 'login')
              }}
            >
              GUEST
            </div>
          </form>
        </div>
      </div>
      {/* <div className="login__info">
        <img className="login__info--image" src="images/main-image.png" />
      </div> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    guest: (email, password, formdata) =>
      dispatch(auth(email, password, formdata)),
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
