import React, {Component} from 'react'
import Navbar from '../../template/Navbar'
import {BarLoader, PacmanLoader} from 'react-spinners'
import './style.css'

class CourseMaterial extends Component {
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
    fetchTaskList(courseId, callback) {
        fetch(`${this.props.ctx.backendURL}/api/courses/${courseId}/tasks/`).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(data => {
            this.setState({
                taskList: data,
                activeTask: data.length
            }, () => callback(courseId))
        }).catch(err => {
            console.log(err)
        })
    }
    fetchActiveTask(courseId) {
        fetch(`${this.props.ctx.backendURL}/api/courses/${courseId}/tasks/${this.state.activeTask}`).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(data => {
            this.setState({
                taskDetail: data
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        // this.fetchTaskList(this.props.ctx.courseId, this.fetchActiveTask)
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
                                    <div id="task-list-loader">
                                        <BarLoader color='blue'/>
                                    </div>
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
                                    <div id="task-detail-loader">
                                        <PacmanLoader color='orange'/>
                                    </div>
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