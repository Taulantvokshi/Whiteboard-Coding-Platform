import React, {useState} from 'react'
import {getFilterDataThunk, toogleSearch} from '../../store/clickStore'
import {connect} from 'react-redux'

const SearchComponent = ({filterData, letToogleSearch}) => {
  const [clicked, setClicked] = useState(false)
  return (
    <form
      className="user_toolbar_form"
      onSubmit={event => {
        event.preventDefault()
        filterData({
          date: event.target.date.value,
          language: event.target.language.value,
          names: event.target.names.value
        })
        event.target.date.value = ''
        event.target.language.value = ''
        event.target.names.value = ''
      }}
    >
      <div className="user_toolbar_form-date">
        <label className="search-bar-label">Search By Date </label>
        <input placeholder="Date" type="date" name="date" />
      </div>

      <div className="user_toolbar_form-language">
        <label className="search-bar-label"> Search By Language </label>
        <select name="language">
          <option value="Language">Select</option>
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
          <option value="Java">Java</option>
        </select>
      </div>

      <div className="user_toolbar_form-name">
        <label className="search-bar-label"> Search By Name </label>
        <input type="text" name="names" placeholder="Name" />
      </div>
      <div className="toolbar__box">
        <button
          onClick={() => {
            letToogleSearch(true)
            setClicked({clicked: !clicked})
          }}
          type="submit"
          className={!clicked ? 'toolbar__box-button' : 'toolbar__box-clicked'}
        >
          {!clicked ? (
            <p className="button_clicket-text">Search</p>
          ) : (
            <p className="button_clicket-text">Show All</p>
          )}
        </button>
      </div>
    </form>
  )
}

const dispatchState = dispatch => {
  return {
    filterData: data => dispatch(getFilterDataThunk(data)),
    letToogleSearch: option => dispatch(toogleSearch(option))
  }
}

export default connect(null, dispatchState)(SearchComponent)
