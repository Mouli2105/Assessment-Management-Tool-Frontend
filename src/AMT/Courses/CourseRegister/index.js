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
        this.fetchCourse = this.fetchCourse.bind(this)
    }
    fetchCourse() {
        fetch(`${this.props.backendURL}/api/courses/${this.props.courseId}`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
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
                            <div className="col">
                                <img 
                                    className="" 
                                    src={require('./course-placeholder.jpg')} 
                                    alt="Course"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1 className="display-1">{this.state.name}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>{this.state.description}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn">
                                    {!this.state.isArchived ? 
                                        'Register'
                                        :
                                        'View Archived'
                                    }
                                </button>
                            </div>
                        </div>
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