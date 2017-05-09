import React from 'react'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'


const CreateButton = (props) => (
  <Link className="icon-link"
        to={ props.url }
        title="Создать">
    <FontAwesome
      name="plus-circle" />
  </Link>
)


export default CreateButton
