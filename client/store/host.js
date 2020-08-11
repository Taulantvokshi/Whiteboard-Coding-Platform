/*eslint complexity:*/
import axios from 'axios'

let initialState = {
  hostEvents: [],
  location: [],
  edit: '',
  event: {},
  joinedEvents: {},
  places: [],
  error: {},
  yourEvents: [],
  allOfJoinedEvents: [],
  sucessPost: '',
  addressInput: '',
}
import {GoogleKey} from '../../secrets'
//FORM
const GET_YOUR_EVENTS = 'GET_YOUR_EVENTS'
const GET_EVENTS = 'GET_EVENTS'
const SELECTED_LOCATION = 'SELECTED_LOCATION'
const EDIT = 'EDIT'
const EVENT = 'EVENT'
const JOINED_EVENTS = 'JOINED_EVENTS'
const ERROR = 'ERROR'
const PLACES = 'PLACES'
const GET_JOINED_EVENTS = 'GET_JOINED_EVENTS'
const CLEAR_COMPONENT = 'CLEAR_COMPONENT'
const SUCESS_POST = 'SUCESS_POST'
const CLEAR_SUCESS_POST = 'CLEAR_SUCESS_POST'
const IS_VALID_ADDRESS = 'IS_VALID_ADDRESS'
const CLEAR_ADDRESS_MESSAGE = 'CLEAR_ADDRESS_MESSAGE'
const CLEAR_EVENT_FROM_UPDATE = 'CLEAR_EVENT_FROM_UPDATE'
// ACTION CREATOR

export const isValidAddress = (message, option) => {
  return (dispatch) => {
    if (option) {
      return dispatch({
        type: IS_VALID_ADDRESS,
        message,
      })
    } else {
      return dispatch({
        type: CLEAR_ADDRESS_MESSAGE,
      })
    }
  }
}

const joinedEventss = (events) => {
  return {
    type: GET_JOINED_EVENTS,
    events,
  }
}

const getYourEvents = (events) => {
  return {
    type: GET_YOUR_EVENTS,
    events,
  }
}
const places = (place) => {
  return {
    type: PLACES,
    place,
  }
}

const getJoinedEvents = (users) => {
  return {type: JOINED_EVENTS, users}
}

const getEvent = (singleEvent) => {
  return {
    type: EVENT,
    singleEvent,
  }
}

const getError = (error) => {
  return {
    type: ERROR,
    error,
  }
}
export const getEvents = (events) => {
  return {
    type: GET_EVENTS,
    events,
  }
}

export const edit = (actionEdit) => {
  return {
    type: EDIT,
    actionEdit,
  }
}

export const selectedLocation = (location) => {
  return {
    type: SELECTED_LOCATION,
    location,
  }
}

const sucessPost = (messages) => {
  return (dispatch) => {
    return dispatch({
      type: SUCESS_POST,
      messages,
    })
  }
}

export const clearSucessPost = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_SUCESS_POST,
    })
  }
}

export const claerError = () => {
  return (dispatch) => {
    return dispatch(getError({response: {data: {}}}))
  }
}

export const updateThunk = (id, data) => {
  return (dispatch) => {
    axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: data.address,
          key: GoogleKey,
        },
      })
      .then((location) => {
        const lat = location.data.results[0].geometry.location.lat
        const lng = location.data.results[0].geometry.location.lng
        if (lat || lng) {
          axios
            .put(`/api/host/update/${id}`, {
              ...data,
              exactAddress: data.address,
              address: lat + ' ' + lng,
            })
            .then(async (message) => {
              dispatch(sucessPost(message.data))
              const events = await axios.get('/api/host/events')
              dispatch(getEvents(events.data))
            })
            .catch((err) => {
              return dispatch(getError(err))
            })
        }
      })
      .catch((err) => {
        dispatch(
          isValidAddress(
            {
              message: 'Invalid Address',
            },
            true
          )
        )
        throw new Error(err)
      })
  }
}

export const eventThunk = (id, option) => {
  return async (dispatch) => {
    if (option) {
      dispatch({
        type: CLEAR_EVENT_FROM_UPDATE,
      })
    } else {
      try {
        const event = await axios.get(`/api/host/event/${id}`)
        dispatch(getEvent(event.data))
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
export const deleteUserThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/host/delete/${id}`)
      const events = await axios.get('/api/host/events')
      dispatch(getEvents(events.data))
      const updatedList = await axios.get('/api/stats/your-events')
      dispatch(getYourEvents(updatedList.data))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const unAttendetEventThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`/api/stats/remove-joined-event/${id}`)
      const events = await axios.get('/api/stats/joined-events')
      dispatch(joinedEventss(events.data))
      const event = await axios.get('/api/host/events')
      dispatch(getEvents(event.data))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const getEventsThunk = () => {
  return async (dispatch) => {
    try {
      const events = await axios.get('/api/host/events')
      dispatch(getEvents(events.data))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const host = (data) => {
  let {address} = data
  return (dispatch) => {
    axios
      .get('https://maps.googleapis.com/maps/api/geocode/json?', {
        params: {
          address: address,
          key: GoogleKey,
        },
      })
      .then((datas) => {
        const lat = datas.data.results[0].geometry.location.lat
        const lng = datas.data.results[0].geometry.location.lng

        if (lat || lng) {
          axios
            .post('/api/host/newEvent', {
              ...data,
              exactAddress: address,
              address: lat + ' ' + lng,
            })
            .then(async (message) => {
              dispatch(sucessPost(message.data))
              const events = await axios.get('/api/host/events')
              dispatch(getEvents(events.data))
            })
            .catch((err) => {
              return dispatch(getError(err))
            })
        }
      })
      .catch(() => {
        dispatch(
          isValidAddress(
            {
              message: 'Invalid Address',
            },
            true
          )
        )
      })
  }
}

export const autocompliteThunk = (input) => {
  return async (dispatch) => {
    try {
      const locations = await axios.get('key')
      dispatch(places(locations.data.features))
    } catch (error) {
      console.error(error)
    }
  }
}

export const joinedThunk = (id) => {
  return async (dispatch) => {
    try {
      const events = await axios.get(`/api/stats/allEvents/${id}`)
      dispatch(getJoinedEvents(events.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const clearJinedThunk = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_COMPONENT,
    })
  }
}

export const storeEventThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/stats/event/${id}`)
      const events = await axios.get(`/api/stats/allEvents/${id}`)
      dispatch(getJoinedEvents(events.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getYourEventsThunk = () => {
  return async (dispatch) => {
    try {
      const events = await axios.get('/api/stats/your-events')
      dispatch(getYourEvents(events.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOINED_EVENTS:
      return {...state, allOfJoinedEvents: action.events}
    case GET_EVENTS:
      return {...state, hostEvents: action.events}
    case SELECTED_LOCATION:
      return {...state, location: action.location}
    case EVENT:
      return {...state, event: action.singleEvent}
    case CLEAR_EVENT_FROM_UPDATE:
      return {...state, event: {}}
    case JOINED_EVENTS:
      return {...state, joinedEvents: action.users}
    case PLACES:
      return {...state, places: action.place}
    case ERROR:
      return {...state, error: action.error.response.data}
    case GET_YOUR_EVENTS:
      return {...state, yourEvents: action.events}
    case CLEAR_COMPONENT:
      return {...state, joinedEvents: {}}
    case SUCESS_POST:
      return {...state, sucessPost: action.messages.message}
    case CLEAR_SUCESS_POST:
      return {...state, sucessPost: ''}
    case IS_VALID_ADDRESS:
      return {...state, addressInput: action.message}
    case CLEAR_ADDRESS_MESSAGE:
      return {...state, addressInput: ''}
    default:
      return state
  }
}
