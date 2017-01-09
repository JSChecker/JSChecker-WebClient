export default {
  path: '/logout',
  onEnter(state, replace) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    replace({
      pathname: '/',
      state: { nextPathname: state.location.pathname }
    })
  }
}
