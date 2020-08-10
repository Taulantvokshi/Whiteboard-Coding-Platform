import React, {useRef} from 'react'
import {AddIcon} from '../SVG/Icons'
const UploadPictureButtonconst = () => {
  const ref = useRef()
  return (
    <form
      onChange={() => {
        ref.current.click()
      }}
      action="/api/host/userPic"
      method="post"
      encType="multipart/form-data"
    >
      <input
        type="file"
        name="picture"
        placeholder="image"
        id="file"
        style={{display: 'none'}}
      />
      <label style={{cursor: 'pointer'}} htmlFor="file">
        <AddIcon size="12px" color="grey" />
      </label>

      <button style={{display: 'none'}} ref={ref} type="submit" />
    </form>
  )
}
export default UploadPictureButtonconst

// export default UploadImage
