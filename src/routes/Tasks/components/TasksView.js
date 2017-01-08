import React from 'react'
import { Link } from 'react-router'
import './TasksView.scss'
import ApiView from '../../../components/ApiView'

class Task extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }

    this.expand = this.expand.bind(this)
  }

  expand(e) {
    if (!this.props.data.description) {
      return
    }

    this.setState((state) => ({
      expanded: !state.expanded
    }))
  }

  render() {
    let data = this.props.data

    return (
      <article className="task-item">
        <header className="task-header">
          <h3 className="task-title" onClick={this.expand}>{data.title}</h3>
          <aside className="task-header-actions">
            <Link to="#" className="action btn btn-info">Подробно</Link>
            <Link to="#" className="action btn btn-success">Сдать</Link>
          </aside>
        </header>
        <section className="task-description"
                 style={{ display: this.state.expanded ? 'inherit' : 'none',
                          opacity: this.state.expanded ? 1 : 0 }}>
          <p className="task-description-text">{data.description}</p>
        </section>
      </article>
    )
  }
}

export class TaskListView extends ApiView {
  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  componentWillMount() {
    this.sendRequest((res) => {
      this.setState({
        tasks: _.get(res.data, 'tasks', [])
      })
    })
  }

  render() {
    return (
      <section className="route-view">
        <h1 className="view-title">Все задачи</h1>
        <div className="task-list">
        {
          this.state.tasks.map((t, i) => (
            <Task key={i} data={t} />
          ))
        }
        </div>
      </section>
    )
  }
}

export default {
  TaskListView: TaskListView
}
