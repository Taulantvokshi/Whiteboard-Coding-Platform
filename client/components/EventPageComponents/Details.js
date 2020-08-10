import React from 'react'

const EventDetails = ({details}) => {
  return (
    <div className="eventPage-container">
      <div className="eventPage-container_details">
        <div className="eventPage-container_details-h2">
          <h2>Details</h2>
        </div>
        <div className="eventPage-container_details-text">
          {details.length ? (
            details.length > 2200 ? (
              details.slice(0, 2200)
            ) : (
              details
            )
          ) : (
            <p>
              Is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
