import React from 'react'
import Header from '../../components/Header'
import { IndexLink, Link } from 'react-router'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className="app-layout">
    <aside className="sidebar">
      <div className="sidebar-top">
        <section className="user-info">
          <h2 className="user-name">
            {'Иванов Иван'}
          </h2>
          <h3 className="user-group">
            {'КН-102'}
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
      {children}
    </main>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
