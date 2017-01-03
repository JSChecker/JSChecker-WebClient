import React from 'react'
import ApiView from '../../../components/ApiView'
import { Link } from 'react-router'
import './UsersView.scss'

export class UserListView extends ApiView {
  componentWillMount() {
    // this.enablePolling()
    this.sendRequest()
  }

  componentWillUnmount() {
    this.cancelRequest()
  }

  render() {
    let users = this.state.data.users || []

    return (
      <nav>
        {
          users.map((user, i) => {
            let url = `${this.currentPath}/${user.username}`

            return (
              <Link to={url} key={i}>
                {user.username}
              </Link>
            )
          })
        }
      </nav>
    )
  }
}

export class UserItemView extends ApiView {
  componentWillMount() {
    this.sendRequest()
  }

  componentWillUnmount() {
    this.cancelRequest()
  }

  render() {
    let user = this.state.data.user

    if (!user) {
      return (
        <dl></dl>
      )
    }

    return (
      <dl>
        <dt>Username</dt>
        <dd>{user.username}</dd>
        <dt>Фамилия</dt>
        <dd>{user.name.last}</dd>
        <dt>Имя</dt>
        <dd>{user.name.first}</dd>
        <dt>Отчество</dt>
        <dd>{user.name.middle}</dd>
        <dt>Активный</dt>
        <dd>{user.active ? 'Да' : 'Нет'}</dd>
      </dl>
    )
  }
}
