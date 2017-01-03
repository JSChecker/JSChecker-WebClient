import React from 'react'
import { Link } from 'react-router'
import isEqual from 'lodash/isEqual'

export class ApiView extends React.Component {
  static API_ROOT_URL = '/api/v1'

  constructor(props) {
    super(props)

    this.state = {
      data: { }
    }

    this.router = props.router

    this.xhr = new XMLHttpRequest()
    this.xhr.onreadystatechange = this.onServerData.bind(this)
  }

  get currentPath() {
    return this.router.location.pathname
  }

  get apiUrl() {
    return ApiView.API_ROOT_URL + this.currentPath
  }

  sendRequest(timeout = 0) {
    if (this.xhr === null) {
      return
    }

    let url = this.apiUrl + `?timeout=${timeout}`
    this.xhr.open('GET', url, true)
    this.xhr.send()
  }

  cancelRequest() {
    if (this.xhr === null) {
      return
    }

    this.xhr.abort()
    this.xhr = null
  }

  enablePolling(timeout = 10000) {
    this.xhr.onload = this.sendRequest.bind(this, timeout)
  }

  onServerData() {
    if (this.xhr === null) {
      return
    }

    if (this.xhr.readyState !== XMLHttpRequest.DONE) {
      return
    }

    let response = this.xhr.responseText

    if (!response) {
      return
    }

    let parsed = JSON.parse(response)

    this.setState({
      status: parsed.status,
      data: parsed.data,
      message: parsed.message
    })
  }
}

export default ApiView
