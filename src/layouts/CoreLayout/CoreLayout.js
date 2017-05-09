import React from 'react'
import LogoutButton from '../../components/LogoutButton'
import Loader from '../../components/Loader'
import { IndexLink, Link } from 'react-router'
import '../../styles/font-awesome/scss/font-awesome.scss'
import '../../styles/core.scss'
import './CoreLayout.scss'


export class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loaded: true }), 700)
  }

  _getUserData () {
    let user = localStorage.getItem('user')

    let userName = ''
    let userGroup = ''
    let userType = 'Anonymous'

    if (user !== null) {
      user = JSON.parse(user)
      userName = `${user.name.last} ${user.name.first}`
      userType = user.__t

      if (userType === 'Student') {
        userGroup = `${user.group.programme.shortName}-${user.group.number}`
      }
    }

    return { name: userName, group: userGroup, type: userType }
  }

  renderTeacher (user) {
    return (
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-top">
            <section className="user-info">
              <LogoutButton />
              <h2 className="user-name">
                {user.name}
              </h2>
              <h3 className="user-group">
                Преподаватель
              </h3>
            </section>
          </div>
          <div className="sidebar-bottom">
            <nav className="nav-menu">
              <Link className="menu-item"
                    activeClassName="active"
                    to="/tasks">
                Все задачи
              </Link>
              <Link className="menu-item"
                    activeClassName="active"
                    to="/users">
                Пользователи
              </Link>
              <Link className="menu-item"
                    activeClassName="active"
                    to="/solutions">
                Проверки
              </Link>
            </nav>
          </div>
        </aside>
        <main className="content">
          <div className="content-inner">
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }

  renderStudent (user) {
    return (
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-top">
            <section className="user-info">
              <h2 className="user-name">
                {user.name}
                <LogoutButton />
              </h2>
              <h3 className="user-group">
                {user.group}
              </h3>
            </section>
            <section className="user-progress">
              <label className="progress-label">Прогресс:</label>
              <progress className="progress" max={10} value={3}></progress>
            </section>
          </div>
          <div className="sidebar-bottom">
            <nav className="nav-menu">
              <Link className="menu-item"
                    activeClassName="active"
                    to="/tasks">
                Все задачи
              </Link>
              <Link className="menu-item"
                    activeClassName="active"
                    to="/solutions">
                Проверки
              </Link>
              <Link className="menu-item"
                    activeClassName="active"
                    to="/achievements">
                Достижения
              </Link>
            </nav>
          </div>
        </aside>
        <main className="content">
          <div className="content-inner">
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }

  renderAnonymous (user) {
    return (
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-bottom">
            <nav className="nav-menu">
              <Link className="menu-item"
                    activeClassName="active"
                    to="/login">
                Войти
              </Link>
              <Link className="menu-item"
                    activeClassName="active"
                    to="/tasks">
                Все задачи
              </Link>
            </nav>
          </div>
        </aside>
        <main className="content">
          <div className="content-inner">
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }

  render () {
    let user = this._getUserData()

    if (!this.state.loaded) {
      return (
        <Loader />
      )
    }

    switch(user.type) {
      case 'Student':
        return this.renderStudent(user)
      case 'Teacher':
        return this.renderTeacher(user)
      case 'Anonymous':
      default:
        return this.renderAnonymous(user)
    }
  }
}

export default CoreLayout
