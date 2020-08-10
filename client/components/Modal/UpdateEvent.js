import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {
  updateThunk,
  claerError,
  clearSucessPost,
  isValidAddress,
  eventThunk
} from '../../store/host'

const UpdateEvent = ({
  event,
  clearErrorThunk,
  clearSucessMessage,
  clearAddressError,
  clearUpdateEvent,
  letUpdateThunk,
  error,
  addressMessage,
  succesMessage
}) => {
  const [state, setState] = useState({
    ...event,
    address: event.exactAddress
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  useEffect(
    () => {
      if (succesMessage) {
        clearErrorThunk()
        clearSucessMessage()
        clearAddressError('', false)
        clearUpdateEvent(1, true)
        history.push('/home')
      }
    },
    [succesMessage.length]
  )

  return (
    <form
      className="newform"
      onSubmit={e => {
        e.preventDefault()
        letUpdateThunk(event.id, state)
      }}
    >
      <div className="newform__address">
        <label className="label">
          {addressMessage ? addressMessage.message : 'Address'}
        </label>
        <input
          className="newform__address-input"
          type="text"
          name="address"
          placeholder="address"
          value={state.address}
          onChange={handleChange}
          style={{
            border: addressMessage.message
              ? '1px solid red'
              : '1px solid #d1d1d1'
          }}
        />
      </div>

      <div className="newform__count">
        <label className="label">
          {!!error.people && error.people.length
            ? error.people
            : 'Participants'}
        </label>
        <input
          type="text"
          name="people"
          placeholder="count"
          value={state.people}
          onChange={handleChange}
          className="newform__count-input"
          style={{
            border:
              !!error.people && error.people.length
                ? '1px solid red'
                : '1px solid #d1d1d1'
          }}
        />
      </div>
      <div className="newform__date">
        <div className="newform__date-exact">
          <label className="label">
            {!!error.date && error.date.length ? error.date : 'Date'}
          </label>
          <input
            className="newform__date-exact--input"
            type="date"
            name="date"
            value={state.date}
            onChange={handleChange}
            style={{
              border:
                !!error.date && error.date.length
                  ? '1px solid red'
                  : '1px solid #d1d1d1'
            }}
          />
        </div>

        <div className="newform__date-time">
          <label className="label">
            {!!error.time && error.time.length ? error.time : 'Time'}
          </label>
          <input
            className="newform__date-time--input"
            type="time"
            id="updateTime"
            name="time"
            style={{
              border:
                !!error.time && error.time.length
                  ? '1px solid red'
                  : '1px solid #d1d1d1'
            }}
          />
        </div>
      </div>
      <div className="newform__language">
        <label className="label">
          <span className="span">*</span>Language
        </label>
        <select
          className="newform__language-input"
          id="updateOptions"
          value={state.language}
          onChange={handleChange}
          name="language"
        >
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
          <option value="Java">Java</option>
        </select>
      </div>
      <div className="newform__details">
        <label className="label">
          {!!error.details && error.details.length ? error.details : 'Details'}
        </label>
        <textarea
          className="newform__details-input"
          onChange={handleChange}
          value={state.details}
          name="details"
          style={{
            border:
              !!error.details && error.details.length
                ? '1px solid red'
                : '1px solid #d1d1d1'
          }}
        />
      </div>
      <div className="newform__button">
        <button className="newform__button-input" type="submit">
          Update
        </button>
      </div>
    </form>
  )
}
const mapStateToProps = state => {
  return {
    event: state.host.event,
    error: state.host.error,
    succesMessage: state.host.sucessPost,
    addressMessage: state.host.addressInput
  }
}

const dispatchState = dispatch => {
  return {
    letUpdateThunk: (id, data) => dispatch(updateThunk(id, data)),
    clearErrorThunk: () => dispatch(claerError()),
    clearSucessMessage: () => dispatch(clearSucessPost()),
    clearAddressError: (message, option) => {
      dispatch(isValidAddress(message, option))
    },
    clearUpdateEvent: (id, option) => dispatch(eventThunk(id, option))
  }
}
export default connect(mapStateToProps, dispatchState)(UpdateEvent)
