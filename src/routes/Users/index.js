import View from './components/UsersView'

export default {
  childRoutes: [{
    path: '/users',
    component: View.UserListView
  }, {
    path: '/users/create',
    component: View.UserFormView
  }, {
    path: '/users/:username',
    component: View.UserItemView
  }, {
    path: '/users/:username/edit',
    component: View.UserFormView
  }]
}
