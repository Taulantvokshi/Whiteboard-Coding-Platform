import React from 'react'

const Loader = ({height, width, backgroundColor}) => {
  return (
    <div
      style={{
        height,
        width,
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img style={{width: '4rem', height: '4rem'}} src="/images/Loader.gif" />
    </div>
  )
}

export default Loader
