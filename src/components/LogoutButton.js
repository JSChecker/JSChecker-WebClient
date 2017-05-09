import React from 'react'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'


const LogoutButton = (props) => (
  <Link className="icon-link logout-button"
        to="/logout"
        title="Выйти">
    <FontAwesome
      name="sign-out"/>
  </Link>
)


export default LogoutButton
