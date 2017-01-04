import React from 'react'
import ApiView from '../../../components/ApiView'
import { Link } from 'react-router'
import './UsersView.scss'

import _ from 'lodash'

export class UserListView extends ApiView {
  componentWillMount () {
    this.polling()
  }

  componentWillUnmount () {
    this.cancelRequest()
  }

  get links () {
    let users = _.get(this.state, 'data.users', [])

    return users.map((user, i) => {
      let url = `${this.currentPath}/${user.username}`

      return (
        <li key={i}>
          <Link to={url}>
            {user.username}
          </Link>
        </li>
      )
    })
  }

  render () {
    return (
      <main>
        <ul>
          {this.links}
        </ul>

        <Link to={this.currentPath + '/create'}>
          Создать
        </Link>
      </main>
    )
  }
}

export class UserItemView extends ApiView {
  constructor (props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillMount () {
    this.sendRequest()
  }

  handleDelete (e) {
    e.preventDefault()

    this.sendRequest('delete', (res) => {
      if (res.statusCode === 204) {
        return this.router.replace('/users')
      }
    })
  }

  render () {
    let user = _.get(this.state, 'data.user', null)

    if (!user) {
      return (
        <dl />
      )
    }

    return (
      <main>
        <dl>
          <dt>Username</dt>
          <dd>{user.username}</dd>
          <dt>Фамилия</dt>
          <dd>{user.name.last}</dd>
          <dt>Имя</dt>
          <dd>{user.name.first}</dd>
          <dt>Отчество</dt>
          <dd>{user.name.middle}</dd>
          <dt>Почта</dt>
          <dd>{user.email}</dd>
          <dt>Активный</dt>
          <dd>{user.active ? 'Да' : 'Нет'}</dd>
        </dl>

        <Link to={this.currentPath + '/edit'}>
          Изменить
        </Link>

        <hr />

        <form onSubmit={this.handleDelete}>
          <button type='submit'>
            Удалить
          </button>
        </form>
      </main>
    )
  }
}

export class UserFormView extends ApiView {
  static EMPTY_FORM = {
    username: '',
    password: '',
    email: '',
    name: {
      first: '',
      last: '',
      middle: ''
    },
    active: true
  }

  constructor (props) {
    super(props)

    this.username = props.params.username

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    let ef = UserFormView.EMPTY_FORM

    this.setState({
      form: ef
    })

    if (this.username === undefined) {
      return
    }

    let url = '/users/' + this.username

    this.sendRequestUrl(url, 'get', (res) => {
      let user = _.get(res.data, 'user', {})
      user = _.pick(user, _.keys(ef))

      let form = _.defaults(user, ef)

      this.setState({
        form: form
      })
    })
  }

  handleChange (e) {
    let form = _.set(this.state.form, e.target.name, e.target.value)

    this.setState({
      form: form
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    let url
    let method

    if (this.username !== undefined) {
      url = '/users/' + this.username
      method = 'put'
    } else {
      url = '/users'
      method = 'post'
    }

    let data = this.state.form

    this.sendRequestUrl(url, method, data, (res) => {
      console.log(res)

      if (res.statusCode === 201) {
        this.router.replace('/users')
      }
    })
  }

  render () {
    let form = this.state.form

    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input type='text'
              value={form.username}
              name='username'
              onChange={this.handleChange} />
          </label><br />
          <label>
            Фамилия
            <input type='text'
              value={form.name.last}
              name='name.last'
              onChange={this.handleChange} />
          </label><br />
          <label>
            Имя
            <input type='text'
              value={form.name.first}
              name='name.first'
              onChange={this.handleChange} />
          </label><br />
          <label>
            Отчество
            <input type='text'
              value={form.name.middle}
              name='name.middle'
              onChange={this.handleChange} />
          </label><br />
          <label>
            Почта
            <input type='email'
              value={form.email}
              name='email'
              onChange={this.handleChange} />
          </label><br />
          <label>
            Пароль
            <input type='password'
              name='password'
              onChange={this.handleChange} />
          </label><br />
          <label>
            Активный
            <input type='checkbox'
              checked={form.active}
              name='active'
              onChange={this.handleChange} />
          </label><br />
          <input type='submit' />
        </form>
      </main>
    )
  }
}

export default {
  UserListView: UserListView,
  UserItemView: UserItemView,
  UserFormView: UserFormView
}
