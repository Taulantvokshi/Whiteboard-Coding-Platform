/*eslint complexity:*/
export default (events, filterData) => {
  if (!filterData.language && !filterData.date && !filterData.names) {
    return events
  }

  if (filterData.language && (!filterData.date && !filterData.names)) {
    return events.filter(event => {
      return event.language === filterData.language
    })
  }

  if (filterData.date && (!filterData.language && !filterData.names)) {
    return events.filter(event => {
      return event.date === filterData.date
    })
  }

  if (filterData.names && (!filterData.language && !filterData.date)) {
    return events.filter(event => {
      return (
        filterData.names.length &&
        (event.firstName + ' ' + event.lastName).startsWith(filterData.names)
      )
    })
  }

  if (filterData.language && filterData.date && !filterData.names) {
    return events
      .filter(event => {
        return event.date === filterData.date
      })
      .filter(event => {
        return event.language === filterData.language
      })
  }

  if (filterData.language && filterData.names && !filterData.date) {
    return events
      .filter(event => {
        return event.language === filterData.language
      })
      .filter(event => {
        return (
          filterData.names.length &&
          (event.firstName + ' ' + event.lastName).startsWith(filterData.names)
        )
      })
  }

  if (filterData.date && filterData.names && !filterData.language) {
    return events
      .filter(event => {
        return event.date === filterData.date
      })
      .filter(event => {
        return (
          filterData.names.length &&
          (event.firstName + ' ' + event.lastName).startsWith(filterData.names)
        )
      })
  }

  return events
    .filter(event => {
      return event.date === filterData.date
    })
    .filter(event => {
      return event.language === filterData.language
    })
    .filter(event => {
      return (
        filterData.names.length &&
        (event.firstName + ' ' + event.lastName).startsWith(filterData.names)
      )
    })
}
