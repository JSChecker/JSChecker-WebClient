import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'

import UsersView from './Users'
import StudentsView from './Students'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    UsersView,
    StudentsView
  ]
})

export default createRoutes
