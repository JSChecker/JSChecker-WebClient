import React from 'react'
import Header from '../../components/Header'
import { IndexLink, Link } from 'react-router'
import './CoreLayout.scss'
import '../../styles/core.scss'


export class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element.isRequired
  }

  _getUserData() {
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

  renderTeacher(user) {
    return (
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-top">
            <section className="user-info">
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
              <Link className="menu-item" activeClassName="active" to="/tasks">Все задачи</Link>
              <Link className="menu-item" activeClassName="active" to="/users">Пользователи</Link>
              <Link className="menu-item" activeClassName="active" to="/solutions">Проверки</Link>
            </nav>
          </div>
        </aside>
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

  renderStudent(user) {
    return (
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-top">
            <section className="user-info">
              <h2 className="user-name">
                {user.name}
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
              <Link className="menu-item" activeClassName="active" to="/tasks">Все задачи</Link>
              <Link className="menu-item" activeClassName="active" to="/solutions">Проверки</Link>
              <Link className="menu-item" activeClassName="active" to="/achievements">Достижения</Link>
            </nav>
          </div>
        </aside>
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

  renderAnonymous(user) {
    return (
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-bottom">
            <nav className="nav-menu">
              <Link className="menu-item" activeClassName="active" to="/users">Пользователи</Link>
              <Link className="menu-item" activeClassName="active" to="/tasks">Все задачи</Link>
            </nav>
          </div>
        </aside>
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

  render() {
    let user = this._getUserData()

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
