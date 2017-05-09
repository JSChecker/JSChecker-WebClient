import View from './components/TasksView'

export default {
  childRoutes: [{
    path: '/tasks',
    component: View.TaskListView
  }, {
    path: '/tasks/new',
    component: View.TaskCreateView
  }, {
    path: '/tasks/:task',
    component: View.TaskItemView
  }]
}
