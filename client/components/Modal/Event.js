import React from 'react'
import {UpdateEvent, NewEntry} from '../../components'
import {edit} from '../../store/clickStore'
import {claerError, isValidAddress, eventThunk} from '../../store/host'
import {connect} from 'react-redux'
import history from '../../history'
import {CircleCross} from '../../components/SVG/Icons'
const Event = ({
  value,
  status,
  clearErrorThunk,
  clearAddressError,
  clearUpdate
}) => {
  localStorage.setItem('data', value)

  const newEventOrEdit = currentstatus => {
    if (currentstatus === 'edit') {
      return <UpdateEvent />
    } else if (currentstatus === 'new') {
      return <NewEntry />
    }
  }

  return (
    <div className="modal-event">
      <div className="modal-event__content">
        <div
          className="modal-event__content-links"
          onClick={() => {
            status('edit')
            clearErrorThunk()
            clearAddressError('', false)
            clearUpdate(1, true)
            history.push('/home/your-events')
          }}
        >
          <CircleCross color="orangered" size="22" />
        </div>
        {newEventOrEdit(value)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {value: state.clickStore.editOrNew}
}

const dispatchState = dispatch => {
  return {
    status: val => dispatch(edit(val)),
    clearErrorThunk: () => dispatch(claerError()),
    clearAddressError: (message, option) =>
      dispatch(isValidAddress(message, option)),
    clearUpdate: (id, option) => dispatch(eventThunk(id, option))
  }
}
export default connect(mapStateToProps, dispatchState)(Event)
