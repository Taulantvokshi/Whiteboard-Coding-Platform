import React from 'react'

import {
  HomeVideo,
  HomeEvents,
  HomeMap,
  HomeReviews,
  HomeEventsInfo,
  Greetings,
  MapDescription
} from '../../client/components'
const HomePage = () => {
  return (
    <section className="home_container">
      <HomeVideo />
      <HomeEventsInfo />
      <Greetings />
      <HomeEvents />,
      <MapDescription />
      <HomeMap />
      <HomeReviews />
    </section>
  )
}

export default HomePage
