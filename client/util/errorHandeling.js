export const errorBorderColor = (object, value) => {
  for (let key in object) {
    if (value === key) {
      return {border: '2px solid red'}
    } else {
      return {}
    }
  }
}

export const errorLabelMessage = (object, value) => {
  for (let key in object) {
    if (value === key) {
      return object[key]
    } else {
      return
    }
  }
}
