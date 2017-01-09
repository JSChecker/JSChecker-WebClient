import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'

import LoginView from './Login'
import LogoutView from './Logout'
import UsersView from './Users'
import TasksView from './Tasks'

export const createRoutes = (store) => ({
  childRoutes: [{
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home,
    childRoutes : [
      TasksView,
      UsersView
    ]
  }, {
    childRoutes: [
      LoginView,
      LogoutView
    ]
  }]
})

export default createRoutes
