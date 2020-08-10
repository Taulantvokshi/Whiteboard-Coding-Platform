import React from 'react'
import {Navbar, HomeFooter} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="main">
      <Navbar />
      <Routes />
      <HomeFooter />
    </div>
  )
}

export default App
