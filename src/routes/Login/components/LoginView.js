import React from 'react'
import './LoginView.scss'

import _ from 'lodash'

import ApiView from '../../../components/ApiView'
import Loader from '../../../components/Loader'

export class LoginView extends ApiView {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        username: '',
        password: ''
      },
      errors: {
        username: null,
        password: null
      },
      loaded: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target

    this.setState((state) => ({
      data: _.set(state.data, name, value)
    }))
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loaded: true }), 700)
  }

  _onLoggedIn(data) {
    let redirectUrl = this.props.location.query.redirect || '/'

    let token = data.token
    localStorage.setItem('token', token)

    let user = data.user
    localStorage.setItem('user', JSON.stringify(user))

    console.log(localStorage.getItem('user'))

    this.props.router.replace(redirectUrl)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.sendRequestUrl('/token', 'post', this.state.data, (res) => {
      switch(res.status) {
        case 'success':
          this._onLoggedIn(res.data)
          break
        case 'fail':
          this.setState({
            errors: {
              username: _.get(res.data, 'username.message', null),
              password: _.get(res.data, 'password.message', null)
            }
          })
          break
        case 'error':
        default:
          console.log(res)
      }
    })
  }

  render() {
    if (!this.state.loaded) {
      return (
        <Loader />
      )
    }

    let { username: ue, password: pe } = this.state.errors

    return (
      <section className="login-container">
        <button className="back-button"
                onClick={this.router.goBack}>Back</button>
        <span className="logo-big"></span>
        <form className="form login-form"
              onSubmit={this.handleSubmit}>
          <label className={'form-input-box' + (ue ? ' invalid' : '')}>
            <span className="form-input-error">
              { ue }
            </span>
            <input className="form-input wide"
                   type="text"
                   name="username"
                   placeholder="Логин"
                   onChange={this.handleChange}
                   required />
          </label>
          <label className={'form-input-box' + (pe ? ' invalid' : '')}>
            <span className="form-input-error">
              { pe }
            </span>
            <input className="form-input wide"
                   type="password"
                   name="password"
                   placeholder="Пароль"
                   onChange={this.handleChange}
                   required />
          </label>
          <input className="form-input form-button"
                 type="submit"
                 value="Войти" />
        </form>
      </section>
    )
  }
}

export default LoginView
