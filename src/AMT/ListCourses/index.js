import React, {Component} from 'react'
import CourseCard from './CourseCard'
import Settings from '../template/Settings'
import { PropagateLoader } from 'react-spinners'
import {withRouter} from 'react-router'
import './style.css'

class ListCourses extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            courses: [],
            filteredCourses: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.search = this.search.bind(this)
        this.fetchCourses = this.fetchCourses.bind(this)
    }
    handleSearchChange(event) {
        this.setState({
            searchText: event.target.value
        }, () => {
            if (this.state.searchText !== '') {
                this.setState({
                    filteredCourses: this.state.courses.filter(
                        course => course.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                    )
                })
            } else {
                this.setState({
                    filteredCourses: this.state.courses
                })
            }
        })
    }
    search(event) {
        event.preventDefault()
        // implement this...
    }
    fetchCourses() {
        fetch(`${this.props.baseURL}/api/courses/`, {
            headers: {
                'Authorization': `jwt ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status < 300) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(data => {
            this.setState({
                courses: data,
                filteredCourses: data,
            })
        }).catch(err => {
            console.log(err)
        })
        
    }
    componentDidMount() {
        this.props.alreadyLoggedIn(
            this.fetchCourses, 
            () => {
                this.props.history.push('/home')
            }
        )
    }
    render() {
        return (
            <div className="container-fluid">
                <section id="navigation-bar">
                    <nav className="navbar fixed-top">
                        <a href="/" className="navbar-brand">Courses</a>
                        <div className="navbar-nav ml-auto">
                            <div className="nav-item">
                                <form className="form-inline" onSubmit={this.search}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" name="searchText" value={this.state.searchText} onChange={this.handleSearchChange} placeholder="Search..." />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Settings />
                    </nav>
                </section>
                <section id="content">
                    {this.state.courses.length !== 0 ?
                        <div className="card-columns">
                            {this.state.filteredCourses.map(course => 
                                <CourseCard 
                                    key={course.id}
                                    id={course.id}
                                    name={course.name} 
                                    description={course.description}
                                />
                            )}
                        </div>
                    :
                        <div id="loading-spinner">
                            <PropagateLoader color='lightblue'/>
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default withRouter(ListCourses)