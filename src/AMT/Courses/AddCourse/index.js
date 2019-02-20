import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Navbar from '../../template/Navbar'
import {ClipLoader} from 'react-spinners'
import './style.css'

class AddCourse extends Component {
    constructor() {
        super()
        this.state = {
            showPage   : false,
            name       : '',
            description: ''
        }
        this.addCourse    = this.addCourse.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    addCourse(event) {
        event.preventDefault()
        fetch(`${this.props.ctx.backendURL}/api/courses/`, {
            method: 'POST',
            headers: {
                'Authorization': this.props.ctx.getJWTHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name       : this.state.name,
                description: this.state.description,
                arhived   : false
            })
        }).then(res => {
            if (res.status < 300) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(course => {
            this.props.history.push(`/courses/${course.id}`)
        }).catch(err => {
            console.log(err)
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount() {
        this.props.ctx.alreadyLoggedIn(
            () => {
                this.props.ctx.role !== 'mentors' ?
                    this.props.history.push('/courses')
                    :
                    this.setState({
                        showPage: true
                    })
            }, 
            () => {
                this.props.history.push('/home')
            }
        )
    }
    render() {
        return (
            <div className="container-fluid">
                <Navbar
                    title='Courses'
                    titleRedirectURL='/courses'
                    showSettings
                />
                {this.state.showPage ?
                    <div className="container">
                        <form onSubmit={this.addCourse}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                    name='name'
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder='Provide an appropriate name to your new course...'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea 
                                    name='description'
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    rows={10}
                                    placeholder='This description will be displayed to the users...'
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Course</button>
                        </form>
                    </div>
                    :
                    <div id="add-course-loader">
                        <ClipLoader />
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(AddCourse)