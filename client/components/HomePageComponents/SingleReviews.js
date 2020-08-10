import React from 'react'

const SingleReviews = ({image}) => {
  return (
    <div className="home_reviews-singleReview">
      <div className="image-container">
        <img src={image} className="singleReview-image" />
      </div>
      <div className="singleReview-container">
        <h4 className="singleReview-text">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt...
        </h4>
        <p id="para">Read more</p>
      </div>
    </div>
  )
}

export default SingleReviews
