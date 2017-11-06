export const includes = (str, value) => {
  if (typeof (str) === 'string') {
    if (str.includes !== undefined) {
      return str.includes(value)
    }
    else if (str.contains !== undefined) {
      return str.contains(value)
    }
    else console.log('couldnt use function includes or contains to find string :/')
  }
}
