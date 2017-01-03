import React from 'react'
import { Link } from 'react-router'
import isEqual from 'lodash/isEqual'
import './ListView.scss'

export class ListView extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    name  : React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      data: { }
    }

    this.xhr = new XMLHttpRequest()
    this.xhr.onreadystatechange = this.onServerData.bind(this)
  }

  get currentUrl() {
    return this.props.router.location.pathname
  }

  get apiUrl() {
    return '/api/v1' + this.currentUrl
  }

  componentWillMount() {
    this.sendServerRequest(0)
  }

  componentWillUnmount() {
    this.xhr.abort()
  }

  sendServerRequest(timeout = 10000) {
    let url = this.apiUrl + `?timeout=${timeout}`
    this.xhr.open('GET', url, true)
    this.xhr.send()
  }

  onServerData() {
    if (this.xhr.readyState !== XMLHttpRequest.DONE) {
      return
    }

    let response = this.xhr.responseText

    this.sendServerRequest()

    if (!response) {
      return
    }

    let parsed = JSON.parse(response)
    let status = parsed.status
    let data = parsed.data

    if (status !== 'success') {
      console.log(data.message)
      return
    }

    if (isEqual(data, this.state.data)) {
      return
    }

    this.setState({ data: data })
  }
}

export default ListView
