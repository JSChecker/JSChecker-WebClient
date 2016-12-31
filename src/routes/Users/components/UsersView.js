import React from 'react'
import './UsersView.scss'
import 'whatwg-fetch'
import isEqual from 'lodash/isEqual'

export class UsersView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: {
        etag: null,
        items: []
      }
    }

    setInterval(() => this.updateUsers(), 600)
  }

  updateUsers() {
    fetch('http://localhost:8000/api/v1/users', { mode: 'cors' })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (isEqual(data.data.users, this.state.users.items)) {
          return
        }

        this.setState({ users: { items: data.data.users } })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.users.items.map((x, i) => (
              <li key={i}>{x.username}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default UsersView
