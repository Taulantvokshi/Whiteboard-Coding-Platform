/*eslint complexity:*/
import React, {useEffect, useState, useRef} from 'react'
import timeFormat from '../../util/timeFormat'
import {
  host,
  claerError,
  clearSucessPost,
  isValidAddress,
  autocompliteThunk,
} from '../../store/host'
import {connect} from 'react-redux'
import history from '../../history'
import {AutoCorrect} from '../../components'
const NewEntry = ({
  handleSubmit,
  clearErrorThunk,
  succesMessage,
  error,
  clearSecessMessage,
  clearAddressError,
  addressMessage,
  autocomplite,
}) => {
  const [hasInput, setHasInput] = useState('')
  const [controlledInput, setControlletInput] = useState('')

  const getSelectedAddres = (addressInput) => {
    setControlletInput(addressInput)
  }

  useEffect(() => {
    if (succesMessage) {
      clearSecessMessage()
      clearErrorThunk()
      clearAddressError('', false)
      history.push('/home')
    }
  }, [succesMessage, error])
  return (
    <form className="newform" onSubmit={handleSubmit}>
      <div className="newform__address">
        <label className="label">
          {addressMessage ? addressMessage.message : 'Address'}
        </label>
        <input
          value={controlledInput}
          onChange={(e) => {
            setControlletInput(e.target.input)
            setHasInput(e.target.value)
            if (e.target.value) {
              autocomplite(e.target.value)
            }
          }}
          className="newform__address-input"
          type="text"
          name="address"
          placeholder="Enter Address"
          required
          style={{
            border: addressMessage ? '1px solid red' : '1px solid #d1d1d1',
          }}
        />
        <div
          style={{display: hasInput.length ? 'block' : 'none'}}
          className="newform__address-autocorrect"
        >
          <AutoCorrect getSelectedAddres={getSelectedAddres} />
        </div>
      </div>

      <div className="newform__count">
        <label className="label">
          {!!error.people && error.people.length
            ? error.people
            : 'Participants'}
        </label>
        <input
          required
          className="newform__count-input"
          type="text"
          name="people"
          placeholder="Number"
          style={{
            border:
              !!error.people && error.people.length
                ? '1px solid red'
                : '1px solid #d1d1d1',
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
            style={{
              border:
                !!error.date && error.date.length
                  ? '1px solid red'
                  : '1px solid #d1d1d1',
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
            style={{
              border:
                !!error.time && error.time.length
                  ? '1px solid red'
                  : '1px solid #d1d1d1',
            }}
            name="time"
          />
        </div>
      </div>

      <div className="newform__language">
        <label className="label">Language</label>
        <select
          className="newform__language-input"
          name="language"
          id="options"
        >
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
          <option value="Java">Java</option>
        </select>
      </div>
      <div className="newform__details">
        <label className="label mar">
          {!!error.details && error.details.length ? error.details : 'Details'}
        </label>
        <textarea
          className="newform__details-input"
          placeholder="Give us some event details"
          name="details"
          style={{
            border:
              !!error.details && error.details.length
                ? '1px solid red'
                : '1px solid #d1d1d1',
          }}
        />
      </div>
      <div className="newform__button">
        <button className="newform__button-input" type="submit">
          <p>Create Event</p>
        </button>
      </div>
    </form>
  )
}

const mapDispatch = (dispatch) => {
  return {
    autocomplite: (input) => dispatch(autocompliteThunk(input)),
    clearErrorThunk: () => dispatch(claerError()),
    clearSecessMessage: () => dispatch(clearSucessPost()),
    clearAddressError: (message, option) => {
      isValidAddress(message, option)
    },
    handleSubmit(evt) {
      evt.preventDefault()
      const address = evt.target.address.value
      const people = evt.target.people.value
      const date = evt.target.date.value
      const language = evt.target.language.value
      const details = evt.target.details.value
      const time = evt.target.time.value.length
        ? timeFormat(evt.target.time.value)
        : ''

      dispatch(
        host({
          address,
          people,
          language,
          date,
          details,
          time,
        })
      )
    },
  }
}

const mapStateToProps = (state) => {
  return {
    allEvents: state.host.hostEvents,
    locations: state.host.places,
    error: state.host.error,
    succesMessage: state.host.sucessPost,
    addressMessage: state.host.addressInput,
  }
}
export default connect(mapStateToProps, mapDispatch)(NewEntry)
