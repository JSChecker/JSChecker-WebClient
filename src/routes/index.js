import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'

import LoginView from './Login'
import TasksView from './Tasks'

export const createRoutes = (store) => ({
  childRoutes: [{
    path        : '/',
    component   : CoreLayout,
    indexRoute: Home,
    childRoutes : [
      TasksView
    ]
  }, {
    childRoutes: [
      LoginView,
    ]
  }]
})

export default createRoutes
