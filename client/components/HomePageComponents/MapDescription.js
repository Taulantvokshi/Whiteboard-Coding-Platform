import React from 'react'
import {LocationPin} from '../SVG/Icons'
const MapDescription = () => {
  return (
    <div className="mapDescription">
      <div className="mapDescription_sentence">
        <div className="mapDescription_sentence--title">
          <h1>Navigate Easily</h1>
          <LocationPin color="#f4482c" size="50" />
        </div>
        <div className="mapDescription_sentence--subtitle">
          <h3>
            Find Events only by exploring the map. Each colored pointer is an
            event and just by checking the color of the pins you know what
            programing language the event represents.
          </h3>
        </div>
      </div>
      <div />
    </div>
  )
}

export default MapDescription
