import React from 'react'
import {SingleComment} from '../../components'
const EventComments = () => {
  return (
    <div className="eventComments">
      <div className="eventComments_newComment">
        <div className="eventComments_newComment-comment">
          <h2>You have a question?</h2>
        </div>

        <div>
          <textarea className="eventComments_newComment-textArea" />
        </div>

        <div className="eventComments_newComment-button">Send</div>
      </div>

      <div className="eventComments_container">
        <div className="eventComments_container-info">
          <h2>Comments(3)</h2>
          <h3 style={{color: 'cadetblue'}}>See all</h3>
        </div>
        <div className="eventComments_container-comment">
          <SingleComment />
          <SingleComment />
          <SingleComment />
          {/* <SingleComment />
          <SingleComment />
          <SingleComment /> */}
        </div>
      </div>
    </div>
  )
}

export default EventComments
