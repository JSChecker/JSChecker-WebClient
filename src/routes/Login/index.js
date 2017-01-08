export default {
  path: '/login',
  getComponent(nextState, cb) {
    require.ensure([], () => {
      const LoginView = require('./components/LoginView').default

      cb(null, LoginView)
    }, 'login')
  }
}
