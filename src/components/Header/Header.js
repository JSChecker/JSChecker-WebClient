import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export class Header extends React.Component {
  render () {
    return (
      <header>
        <h1>JSChecker</h1>
        <nav>
          {this.props.children}
        </nav>
      </header>
    )
  }
}

export default Header
