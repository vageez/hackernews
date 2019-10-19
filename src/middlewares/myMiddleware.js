export default ({ dispatch, getState }) => next => action => {
  // do something
  console.log('My Middleware')
  console.log(getState())
  next(action)
}
