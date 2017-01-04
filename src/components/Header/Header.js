import React from 'react'
import './Header.scss'

export class Header extends React.Component {
  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element)
  }

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
