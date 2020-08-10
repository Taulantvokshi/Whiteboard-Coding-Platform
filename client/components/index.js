/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
//export { default as Host } from './Host'
export {Login, Signup} from './auth-form'
export {default as MapContainer} from './Map.Container'

//Modals
export {default as Modal} from './Modal'
export {default as ResponsiveMenu} from './ResponsiveMenu'
export {default as EventModals} from './EventsModal'

//ReusableComponents
export {default as UploadPictureButtonconst} from './ReusableComponents/UploadPictureButton'
export {default as Menu} from './ReusableComponents/Menu'
export {default as AutoCorrect} from './ReusableComponents/AutoCorrect'

export {default as SingleEventModal} from './ReusableComponents/SingleEventModal'
export {default as Attend} from './ReusableComponents/Attend'

export {default as Loader} from './Loader'

//Modal popup
export {default as Event} from './Modal/Event'
export {default as NewEntry} from './Modal/NewEntry'
export {default as UpdateEvent} from './Modal/UpdateEvent'
export {default as AllEvents} from './Modal/AllEvents'

export {default as UserHome} from './user-home'
export {default as HomePage} from './HomePage'
export {default as EventPage} from './EventPage'
export {default as Settings} from './Settings'

//export {default as Hosting} from './main/Hosting'

//HomePage
export {default as HomeVideo} from './HomePageComponents/Video'
export {default as HomeEvents} from './HomePageComponents/Events'
export {default as HomeMap} from './HomePageComponents/Map'
export {default as HomeFooter} from './HomePageComponents/Footer'
export {default as EventCard} from './HomePageComponents/EventCard'
export {default as HomeReviews} from './HomePageComponents/Reviews'
export {default as SingleReviews} from './HomePageComponents/SingleReviews'
export {default as HomeEventsInfo} from './HomePageComponents/EventsInfo'
export {default as Greetings} from './HomePageComponents/Greetings'
export {default as MapDescription} from './HomePageComponents/MapDescription'

//USERPAGE
export {default as SearchBar} from './UserPageComponents/SearchBar'
export {default as UserHeader} from './UserPageComponents/Header'
export {default as UserToolbar} from './UserPageComponents/Toolbar'
export {default as NewEventButton} from './UserPageComponents/NewEventButton'
export {default as SearchComponent} from './UserPageComponents/SearchComponent'

export {default as TopSchools} from './UserPageComponents/TopSchools'
export {default as UserEvents} from './UserPageComponents/Events'
export {default as SingleEvent} from './UserPageComponents/SingleEvent'
export {default as SingleSchool} from './UserPageComponents/SingleSchool'
export {default as UserJoinedEvents} from './UserPageComponents/JoinedEvents'
export {default as UserCreatedEvents} from './UserPageComponents/YourEvents'
export {default as UserCurrentEvents} from './UserPageComponents/CurrentEvents'
export {default as UserYourSingleEvents} from './UserPageComponents/YourSingleEvent'
export {default as UserSingleCurrentEvent} from './UserPageComponents/SingleCurrentEvent'
export {default as UserAttendiesImages} from './UserPageComponents/AttendiesImages'

//EventPage
export {default as EventAttendees} from './EventPageComponents/Attendees'
export {default as EventInfo} from './EventPageComponents/Info'
export {default as EventHeader} from './EventPageComponents/Header'
export {default as EventDetails} from './EventPageComponents/Details'
export {default as EventComments} from './EventPageComponents/Comments'
export {default as SinglePerson} from './EventPageComponents/SinglePerson'
export {default as SingleComment} from './EventPageComponents/SingleComment'
export {default as SingleMap} from './EventPageComponents/Map'

// Settings

// export {default as SettingsImageChoper} from './SettingsComponents/ImageChoper'
