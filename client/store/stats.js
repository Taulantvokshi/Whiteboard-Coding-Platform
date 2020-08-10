// import axios from 'axios'

// let initializeData = {
//   yourEvents: []
// }

// // Forms
// const GET_YOUR_EVENTS = 'GET_YOUR_EVENTS'
// //Action Creator

// const getYourEvents = events => {
//   return {
//     type: GET_YOUR_EVENTS,
//     events
//   }
// }

// // //THUNKS

// export const getYourEventsThunk = () => {
//   return async dispatch => {
//     try {
//       const events = await axios.get('/api/stats/your-events')
//       dispatch(getYourEvents(events.data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// export default (state = initializeData, action) => {
//   switch (action.type) {
//     case GET_YOUR_EVENTS:
//       return {...state, yourEvents: action.events}
//     default:
//       return state
//   }
// }
