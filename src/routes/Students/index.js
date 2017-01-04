import { StudentListView, StudentItemView } from './components/StudentsView'

export default {
  childRoutes: [{
    path: '/students',
    component: StudentListView
  }, {
    path: '/students/:student',
    component: StudentItemView
  }]
}
