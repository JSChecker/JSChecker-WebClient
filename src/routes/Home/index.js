export default {
  onEnter: (state, replace) => {
    replace({
      pathname: '/tasks',
      state: { nextPathname: state.location.pathname }
    })
  }
}
