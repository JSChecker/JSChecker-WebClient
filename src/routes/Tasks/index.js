import View from './components/TasksView'

export default {
  childRoutes: [{
    path: '/tasks',
    component: View.TaskListView
  }]
}
