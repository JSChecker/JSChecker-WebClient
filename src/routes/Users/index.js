import { UserListView, UserItemView } from './components/UsersView'

export default {
  childRoutes: [{
    path: '/users',
    component: UserListView,
  }, {
    path: '/users/:username',
    component: UserItemView
  }]
}
