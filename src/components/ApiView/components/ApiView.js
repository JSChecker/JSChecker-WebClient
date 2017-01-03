import React from 'react'
import { Link } from 'react-router'
import isEqual from 'lodash/isEqual'

export class ApiView extends React.Component {
  static API_ROOT_URL = '/api/v1'

  constructor(props) {
    super(props)

    this.state = {
      statusCode: null,
      status: null,
      message: null,
      data: null
    }

    this.router = props.router
    this.xhr = new XMLHttpRequest()
  }

  get currentPath() {
    return this.router.location.pathname
  }

  defaultCallback(res) {
    this.setState({
      statusCode: res.statusCode,
      status: res.status,
      data: res.data,
      message: res.message
    })
  }

  sendRequestUrl(url, method = 'get', data = null, cb = null) {
    if (_.isNull(this.xhr)) {
      return
    }

    if (_.isFunction(data) && _.isNull(cb)) {
      cb = data
      data = null
    } else if (!_.isFunction(cb)) {
      cb = this.defaultCallback.bind(this)
    }

    let apiUrl = ApiView.API_ROOT_URL + url

    this.xhr.onreadystatechange = this.onServerData.bind(this, cb)
    this.xhr.open(method, apiUrl, true)
    this.xhr.setRequestHeader('content-type', 'application/vnd.api+json')
    this.xhr.setRequestHeader('accept', 'application/vnd.api+json')

    this.xhr.send(data && JSON.stringify(data))
  }

  sendRequest(method = 'get', data = null, cb = null) {
    this.sendRequestUrl(this.currentPath, method, data, cb)
  }

  pollingUrl(url, timeout = 10000, cb = null) {
    let urlTimeout = url + `?timeout=${timeout}`
    this.xhr.onload = this.sendRequestUrl.bind(this, urlTimeout, 'get', cb)
    this.sendRequestUrl(url, 'get', cb)
  }

  polling(timeout = 10000, cb = null) {
    this.pollingUrl(this.currentPath, timeout, cb)
  }

  cancelRequest() {
    if (_.isNull(this.xhr)) {
      return
    }

    this.xhr.abort()
    this.xhr = null
  }

  onServerData(cb) {
    if (_.isNull(this.xhr)) {
      return
    }

    if (this.xhr.readyState !== XMLHttpRequest.DONE) {
      return
    }

    let response = this.xhr.responseText
    let statusCode = this.xhr.status

    if (!response) {
      return cb({
        data: null,
        message: null,
        status: null,
        statusCode: statusCode
      })
    }

    let parsed = JSON.parse(response)

    cb({
      ...parsed,
      statusCode: statusCode
    })
  }
}

export default ApiView
