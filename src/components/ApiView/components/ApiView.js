import React from 'react'

import _ from 'lodash'

export class ApiView extends React.Component {
  static API_ROOT_URL = '/api/v1'

  static propTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      statusCode: null,
      status: null,
      message: null,
      data: null
    }

    this.router = props.router
    this.xhr = new XMLHttpRequest()
    this.xhr.withCredentials = true
  }

  get currentPath () {
    return this.router.location.pathname
  }

  defaultCallback (res) {
    this.setState({
      statusCode: res.statusCode,
      status: res.status,
      data: res.data,
      message: res.message
    })
  }

  sendRequestUrl (url, method = 'get', data = null, cb = null) {
    if (_.isNull(this.xhr)) {
      return
    }

    if (_.isNull(cb)) {
      if (_.isFunction(data)) {
        cb = data
        data = null
      } else if (_.isFunction(method)) {
        cb = method
        method = 'get'
      } else {
        cb = this.defaultCallback.bind(this)
      }
    }

    let token = localStorage.getItem('token')

    let apiUrl = ApiView.API_ROOT_URL + url

    this.xhr.onreadystatechange = this.onServerData.bind(this, cb)
    this.xhr.open(method, apiUrl, true)
    this.xhr.setRequestHeader('content-type', 'application/vnd.api+json')
    this.xhr.setRequestHeader('accept', 'application/vnd.api+json')
    this.xhr.setRequestHeader('authorization', `JWT ${token}`)

    this.xhr.send(data && JSON.stringify(data))
  }

  sendRequest (method = 'get', data = null, cb = null) {
    this.sendRequestUrl(this.currentPath, method, data, cb)
  }

  pollingUrl (url, timeout = 10000, cb = null) {
    let urlTimeout = url + `?timeout=${timeout}`
    this.xhr.onload = this.sendRequestUrl.bind(this, urlTimeout, 'get', null, cb)
    this.sendRequestUrl(url, 'get', cb)
  }

  polling (timeout = 10000, cb = null) {
    this.pollingUrl(this.currentPath, timeout, cb)
  }

  cancelRequest () {
    if (_.isNull(this.xhr)) {
      return
    }

    this.xhr.abort()
    this.xhr = null
  }

  onServerData (cb) {
    if (_.isNull(this.xhr)) {
      return
    }

    if (this.xhr.readyState !== XMLHttpRequest.DONE) {
      return
    }

    let response = this.xhr.responseText
    let statusCode = this.xhr.status

    if (statusCode === 401) {
      this.router.replace(`/login?redirect=${this.router.location.pathname}`)
      return
    }

    if (statusCode === 403) {
      this.cancelRequest()
    }

    let parsed = response ? JSON.parse(response) : {}

    cb(_.defaults(parsed, {
      data: null,
      message: null,
      status: null,
      statusCode: statusCode
    }))
  }
}

export default ApiView
