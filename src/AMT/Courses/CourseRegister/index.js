import React, {Component} from 'react'
import Navbar from '../../template/Navbar'
import './style.css'
import { ClipLoader } from 'react-spinners';

class CourseRegister extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: '',
            isArchived: false,
            loadedData: false
        }
        this.fetchCourse    = this.fetchCourse.bind(this)
        this.registerCourse = this.registerCourse.bind(this)
        this.getCourseIds   = this.getCourseIds.bind(this)
    }
    fetchCourse() {
        fetch(`${this.props.ctx.backendURL}/api/courses/${this.props.courseId}/`, {
            headers: {
                'Authorization': this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(course => {
            this.setState({
                loadedData: true,
                name: course.name,
                description: course.description,
                isArchived: course.archived
            })
        }).catch(err => {
            console.log(err)
        })
    }
    getCourseIds(courses) {
        let courseIds = []
        courses.forEach(course => courseIds.push(course.id))
        return courseIds
    }
    registerCourse(event) {
        fetch(`${this.props.ctx.backendURL}/api/students/${this.props.ctx.userId}/`, {
            headers: {
                'Authorization': this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(student => {
            let optedCourses = this.getCourseIds(student.optedCourses)
            optedCourses.push(parseInt(this.props.courseId))
            console.log(JSON.stringify(optedCourses))
            return fetch(`${this.props.ctx.backendURL}/api/students/${this.props.ctx.userId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.ctx.getJWTHeader()
                },
                body: JSON.stringify({
                    optedCourses: optedCourses
                })
            })
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(() => {
            this.props.wrapper.changeDisplayPage('material')
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentDidMount() {
        this.fetchCourse()
    }
    render() {
        return (
            <div className="container-fluid">
                <Navbar
                    title='Courses'
                    titleRedirectURL='/courses'
                    showSettings
                />
                <div className="contaiener-fluid text-center">
                {this.state.loadedData ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-sm-8">
                                <div id="course-detail-text">
                                    <h1 className="display-1">{this.state.name}</h1>
                                    <p>{this.state.description}</p>
                                </div>
                                <div className="card">
                                    <div className="card-header">About Course...</div>
                                    <div className="card-body text-left">
                                        <ul>
                                            <li className="card-text">Learn to write code professionally.</li>
                                            <li className="card-text">Learn advanced features and new features.</li>
                                            <li className="card-text">Understand complex topics.</li>
                                            <li className="card-text">Get an understanding of how & where to use.</li>
                                            <li className="card-text">Good practice sessions.</li>
                                            <li className="card-text">Better outputs.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card" id="course-detail-card">
                                    <img 
                                        id="course-register-img"
                                        className="rounded card-img-top" 
                                        src={require('./course-placeholder.jpg')} 
                                        alt="Course"
                                    />
                                    <div className="card-body">
                                        <p className="card-text">Apply to Course here</p>
                                        <p className="card-text">
                                            <button className="btn btn-danger btn-block" onClick={this.registerCourse}>
                                                {!this.state.isArchived ? 
                                                    'Register'
                                                    :
                                                    'View Archived'
                                                }
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col">

                            </div>
                        </div> */}
                    </React.Fragment>
                    :
                    <div style={{position: 'absolute', top: '50%', right: '50%'}}>
                        <ClipLoader />
                    </div>

                }
                </div>
            </div>
        )
    }
}

export default CourseRegister