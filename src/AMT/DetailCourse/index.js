import React, {Component} from 'react'
import Settings from '../template/Settings'
import {ClipLoader} from 'react-spinners'
import './style.css'

class DetailCourse extends Component {
    constructor() {
        super()
        this.state = {
            taskList: [],
            activeTask: -1,
            taskDetail: {},
        }
        this.fetchTaskList = this.fetchTaskList.bind(this)
        this.fetchActiveTask = this.fetchActiveTask.bind(this)
    }
    fetchTaskList(callback) {
        fetch(`http://localhost:8000/api/courses/${this.props.courseID}/tasks/`).then(res =>
            res.json()
        ).then(data => {
            this.setState({
                taskList: data,
                activeTask: data.length
            }, callback)
        }).catch(err => {
            console.log('Unable to fetch task list!', err)
        })
    }
    fetchActiveTask() {
        fetch(`http://localhost:8000/api/courses/${this.props.courseID}/tasks/${this.state.activeTask}`).then(res =>
            res.json()
        ).then(data => {
            this.setState({
                taskDetail: data
            })
        }).catch(err => {
            console.log('Unable to fetch task detail!', err)
        })
    }
    componentDidMount() {
        this.fetchTaskList(this.fetchActiveTask)
    }
    render() {
        return (
            <div className="container-fluid">
                <section id="course-detail-navbar">
                    <nav className="navbar">
                        <a href="/" className="navbar-brand">Course Name</a>
                        <Settings />
                    </nav>
                </section>
                <section id="course-detail-content">
                    <div className="row" id="detail-row">
                        <div className="col-4">
                            <section id="task-list">
                                {this.state.taskList.length !== 0 ?
                                    <div className="list-group">
                                        {this.state.taskList.map((task, index) => 
                                            <a 
                                                key={task.id} 
                                                href='/' 
                                                className={`list-group-item${index + 1 === this.state.activeTask ? ' active' : ''}`}
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    this.setState({
                                                        activeTask: index + 1
                                                    }, this.fetchActiveTask)
                                                }}
                                                >
                                                {index}. {task.title}
                                            </a>    
                                        )}
                                    </div>
                                    :
                                    <ClipLoader />
                                }
                            </section>
                        </div>
                        <div className="col-8">
                            <section id="task-detail">
                                {this.state.activeTask !== -1 ? 
                                    <React.Fragment>
                                        <h2 className="display-2">{this.state.taskDetail.title}</h2>
                                        <hr />
                                        <p>{this.state.taskDetail.content}</p>
                                        {this.state.taskDetail.questions !== null &&
                                            <div id="operations">
                                                <button className="btn btn-success">Download</button>
                                                <button className="btn btn-danger">Submit</button>
                                            </div>
                                        }
                                    </React.Fragment>
                                    :
                                    <ClipLoader />
                                }
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default DetailCourse