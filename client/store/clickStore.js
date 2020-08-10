import axios from 'axios'
const getData = localStorage.getItem('data')
const initalState = {
  joinedEvents: [],
  editOrNew: getData,
  filterData: {},
  toogleSearch: false,
}
//import hostStore, { getEvents } from '../store/host'

// FORM
const GET_JOINED_EVENTS = 'GET_JOINED_EVENTS'
const EDIT = 'EDIT'
const GET_FILTER_DATA = 'GET_FILTER_DATA'
const TOOGLE_SEARCH = 'TOOGLE_SEARCH'
const CLEAR_TOOGLE_SEARCH = 'CLEAR_TOOGLE_SEARCH'
//const REMOVE_ATTENDET_EVENT = 'REMOVE_ATTENDET_EVENT'
export const edit = (actionEdit) => {
  return {
    type: EDIT,
    actionEdit,
  }
}

export const toogleSearch = (option) => {
  return (dispatch) => {
    if (option) {
      return dispatch({
        type: TOOGLE_SEARCH,
      })
    } else {
      return dispatch({
        type: CLEAR_TOOGLE_SEARCH,
      })
    }
  }
}

export const testThunk = (data) => {
  return (dispatch) => {
    dispatch(test(data))
  }
}

const getFilterData = (data) => {
  return {
    type: GET_FILTER_DATA,
    data,
  }
}

const joinedEvents = (events) => {
  return {
    type: GET_JOINED_EVENTS,
    events,
  }
}

export const getFilterDataThunk = (data) => {
  return (dispatch) => {
    dispatch(getFilterData(data))
  }
}

export const yourjoinedEventsThunk = () => {
  return async (dispatch) => {
    try {
      const events = await axios.get('/api/stats/joined-events')
      dispatch(joinedEvents(events.data))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_JOINED_EVENTS:
      return {...state, joinedEvents: action.events}
    case EDIT:
      return {...state, editOrNew: action.actionEdit}
    case GET_FILTER_DATA:
      return {...state, filterData: action.data}
    case CLEAR_TOOGLE_SEARCH:
      return {...state, toogleSearch: false}
    case TOOGLE_SEARCH:
      return {...state, toogleSearch: true}
    default: {
      return state
    }
  }
}
