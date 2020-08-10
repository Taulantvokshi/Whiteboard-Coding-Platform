import React from 'react'
import {SingleReviews} from '../../components'
const HomeReviews = () => {
  const images = ['images/attractive.jpg', 'images/person-three.jpeg']
  return (
    <div className="home_reviews">
      <div className="home_reviews-text">
        <h1 className="home_reviews-text--link">PEOPLE LOVE US!</h1>
      </div>
      <div className="home_reviews-container">
        {images.map(image => {
          return <SingleReviews key={image} image={image} />
        })}
      </div>
    </div>
  )
}

export default HomeReviews
