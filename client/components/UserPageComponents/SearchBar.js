import React from 'react'

const SearchBar = () => {
  return (
    <div className="user_toolbar__search">
      <form>
        <input
          className="user_toolbar__search-input"
          type="text"
          placeholder="Search..."
        />
      </form>
    </div>
  )
}

export default SearchBar
