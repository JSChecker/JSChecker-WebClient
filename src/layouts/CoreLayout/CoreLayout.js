import React from 'react'
import Header from '../../components/Header'
import { IndexLink, Link } from 'react-router'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <Header>
      <IndexLink to='/'>Уточка</IndexLink>
      <Link to='/users'>Пользователи</Link>
    </Header>

    {children}
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
