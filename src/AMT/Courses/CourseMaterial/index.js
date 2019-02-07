import React, { Component } from 'react'
import Navbar from '../../template/Navbar'
import { PulseLoader } from 'react-spinners'
import './style.css'

const _ = require('lodash')

class CourseMaterial extends Component {
    constructor() {
        super()
        this.state = {
            loadedList       : false,
            loadedTask       : false,
            taskList         : [],
            activeTaskId     : -1,
            activeTask       : {},
            submission       : '',
            submissionSuccess: false,
        }
        this.fetchTaskList   = this.fetchTaskList.bind(this)
        this.fetchActiveTask = this.fetchActiveTask.bind(this)
        this.taskClicked     = this.taskClicked.bind(this)
        this.onSubmit        = this.onSubmit.bind(this)
        this.getSubmissions  = this.getSubmissions.bind(this)
    }
    fetchTaskList(courseId) {
        fetch(`${this.props.ctx.backendURL}/api/courses/${courseId}/tasks/`, {
            headers: {
                Authorization: this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(data => {
            this.setState({
                loadedList  : true,
                taskList    : data,
                activeTaskId: (data.length > 0) ? data[data.length - 1].id : -1,
            }, () => {
                if (this.state.activeTaskId !== -1)
                    this.fetchActiveTask(courseId)
            })
        }).catch(err => {
            console.log(err)
        })
    }
    fetchActiveTask(courseId) {
        fetch(`${this.props.ctx.backendURL}/api/courses/${courseId}/tasks/${this.state.activeTaskId}`, {
            headers: {
                Authorization: this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(data => {
            this.setState({
                loadedTask: true,
                activeTask: data
            }, () => {
                this.getSubmissions(this.state.activeTaskId)
            })
        }).catch(err => {
            console.log(err)
        })
    }
    taskClicked(event, taskId) {
        event.preventDefault()
        this.setState({
            loadedTask  : false,
            activeTaskId: taskId
        }, () => {
            this.fetchActiveTask(this.props.courseId)
        })
    }
    onSubmit(event) {
        this.setState({
            submission: event.target.files[0],
        }, () => {
            console.log(this.state)
            let formData = new FormData()
            formData.append('submission', this.state.submission)
            formData.append('course', this.props.courseId)
            formData.append('task', this.state.activeTaskId)
            formData.append('student', this.props.ctx.userId)
            fetch(`${this.props.ctx.backendURL}/api/courses/${this.props.courseId}/tasks/${this.state.activeTaskId}/submissions/`, {
                method: 'POST',
                headers: {
                    Authorization: this.props.ctx.getJWTHeader()
                },
                body: formData
            }).then(res => {
                if (res.status < 300) {
                    return res.json()
                }
                throw new Error(res.statusText)
            }).then(() => {
                console.log('Submission successful!')
            }).catch(err => {
                console.log(err)
            })
        })
    }
    getSubmissions(taskId) {
        fetch(`${this.props.ctx.backendURL}/api/courses/${this.props.courseId}/tasks/${taskId}/submissions/`, {
            headers: {
                'Authorization': this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(submissions => {
            this.setState({
                submissionSuccess: _.includes(_.map(submissions, (s) => s.student), this.props.ctx.userId)
            }, () => console.log(this.state))
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentDidMount() {
        this.fetchTaskList(this.props.courseId, this.fetchActiveTask)
        if (this.state.activeTaskId) {

        }
    }
    render() {
        return (
            <div className="container-fluid">
                <Navbar
                    title='Courses'
                    titleRedirectURL='/courses'
                    showSettings
                />
                <section id="course-detail-content">
                    <div className="row" id="detail-row">
                        <div className="col-4">
                            <section id="task-list">
                                {this.state.loadedList ?
                                    this.state.taskList.length !== 0 ?
                                        <div className="list-group">
                                            {this.state.taskList.map((task, index) =>
                                                <a
                                                    key={task.id}
                                                    href='/'
                                                    className={`list-group-item${task.id === this.state.activeTaskId ? ' active' : ''}`}
                                                    onClick={(event) => this.taskClicked(event, task.id)}
                                                >
                                                    {index}. {task.title}
                                                </a>
                                            )}
                                        </div>
                                        :
                                        <div className='text-center'>No Tasks Available!</div>

                                    :
                                    <div id="task-list-loader">
                                        <PulseLoader color='lightblue' />
                                    </div>
                                }
                            </section>
                        </div>
                        <div className="col-8">
                            <section id="task-detail">
                                {(this.state.loadedList && this.state.taskList.length !== 0) ?
                                    this.state.loadedTask ?
                                        <React.Fragment>
                                            <h2 className="display-2">{this.state.activeTask.title}</h2>
                                            <hr />
                                            <p>{this.state.activeTask.content}</p>
                                            {this.state.activeTask.questions !== null &&
                                                <div id="operations">
                                                    <div className="row">
                                                        <div className="col">
                                                            <a 
                                                                href={this.state.activeTask.questions}
                                                                className="btn btn-success btn-block"
                                                                >
                                                                Download
                                                            </a>
                                                        </div>
                                                        <div className="col">
                                                            <a 
                                                                href='/'
                                                                className={`btn ${this.state.submissionSuccess ? 'btn-success': 'btn-danger'} btn-block`}
                                                                onClick={(event) => {
                                                                    event.preventDefault()
                                                                    this.upload.click()
                                                                }}
                                                                >
                                                                {this.state.submissionSuccess ?
                                                                    'Submitted'
                                                                    :
                                                                    'Submit'
                                                                }
                                                            </a>
                                                            <input 
                                                                type="file" 
                                                                ref={(ref) => this.upload = ref} 
                                                                style={{ display: 'none' }}
                                                                onChange={this.onSubmit}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </React.Fragment>
                                        :
                                        <div id="task-loader">
                                            <PulseLoader color='lightblue' />
                                        </div>
                                    :
                                    <div className='text-center'>No Tasks Available!</div>
                                }
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default CourseMaterial