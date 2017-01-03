import React from 'react'
import ApiView from '../../../components/ApiView'
import { Link } from 'react-router'
import './StudentsView.scss'

export class StudentListView extends ApiView {
  componentWillMount() {
    // this.enablePolling()
    this.sendRequest()
  }

  componentWillUnmount() {
    this.cancelRequest()
  }

  get links() {
    let students = this.state.data.students || []

    return students.map((student, i) => {
      let url = `${this.currentPath}/${student.username}`

      return (
        <Link to={url} key={i}>
          {student.username}
        </Link>
      )
    })
  }

  render() {
    return (
      <nav>
        {this.links}
      </nav>
    )
  }
}

export class StudentItemView extends ApiView {
  componentWillMount() {
    this.sendRequest()
  }

  componentWillUnmount() {
    this.cancelRequest()
  }

  render() {
    let student = this.state.data.student

    if (!student) {
      return (
        <dl></dl>
      )
    }

    return (
      <dl>
        <dt>Фамилия</dt>
        <dd>{student.name.last}</dd>
        <dt>Имя</dt>
        <dd>{student.name.first}</dd>
        <dt>Отчество</dt>
        <dd>{student.name.middle}</dd>
        <dt>Группа</dt>
        <dd>{student.group.programme.shortName}-{student.group.number}</dd>
      </dl>
    )
  }
}
