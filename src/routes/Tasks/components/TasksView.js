import React from 'react'
import { Link } from 'react-router'
import './TasksView.scss'
import ApiView from '../../../components/ApiView'
import CreateButton from '../../../components/CreateButton'

/* CREATE */

export class TaskCreateView extends ApiView {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div />
    )
  }
}


/* ITEM */

export class TaskItemView extends ApiView {
  constructor (props) {
    super(props)

    this.state = {
      task: null
    }
  }

  componentWillMount () {
    this.sendRequest((res) => {
      this.setState({
        task: _.get(res.data, 'task', null)
      })
    })
  }

  render () {
    let task = this.state.task

    if (_.isNull(task)) {
      return (<p>Loading...</p>)
    }

    return (
      <section className="route-view">
        <h4 className="task-difficulty">
          Сложность: { task.difficulty }/5
        </h4>
        <h1 className="view-title">
          { task.title }
        </h1>
        {
          task.description &&
          <article className="task-description">
          {
            _.compact(task.description.split('\n\n'))
              .map((p, i) => (
                <p className="paragraph" key={i}>{
                  _.compact(p.split('\n'))
                    .map((line, j) => (
                      <span key={ `${i}_${j}` }>
                        { line }
                        <br />
                      </span>
                    ))
                }</p>
              ))
          }
          </article>
        }
      </section>
    )
  }
}


/* LIST */

const Task = ({ data, user }) => (
  <article className="task-item">
    <header className="task-header">
      <h3 className="task-title">{ data.title }</h3>
      <aside className="task-header-actions">
        <Link className="action btn btn-info"
              to={ `/tasks/${data._id}` }>
          Подробно
        </Link>
        {
          <Link className="action btn btn-success"
                to="#">
            Сдать
          </Link>
        }
      </aside>
    </header>
  </article>
)

export class TaskListView extends ApiView {
  constructor (props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  componentWillMount () {
    this.sendRequest((res) => {
      this.setState({
        tasks: _.get(res.data, 'tasks', [])
      })
    })
  }

  render () {
    console.log(this.props)

    return (
      <section className="route-view">
        <h1 className="view-title">
          Все задачи
          <CreateButton url="/tasks/new" />
        </h1>
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
  TaskListView: TaskListView,
  TaskItemView: TaskItemView
}
