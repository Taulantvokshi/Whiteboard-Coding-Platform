import React from 'react'
import {connect} from 'react-redux'

const AutoCorrect = ({autoCorrectData, getSelectedAddres}) => {
  return (
    <div>
      {autoCorrectData.length &&
        autoCorrectData.map((resul) => {
          return (
            <div
              onClick={() => {
                getSelectedAddres(resul.place_name)
                document.querySelector(
                  '.newform__address-autocorrect'
                ).style.display = 'none'
              }}
              className="newform__address-autocorrect--div"
              key={resul.id}
            >
              <p>
                {resul.place_name.length > 43
                  ? resul.place_name.slice(0, 43) + '...'
                  : resul.place_name}
              </p>
            </div>
          )
        })}
    </div>
  )
}

const mapPropsToState = (store) => {
  return {autoCorrectData: store.host.places}
}

export default connect(mapPropsToState)(AutoCorrect)
