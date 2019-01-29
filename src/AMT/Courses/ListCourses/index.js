import React, {Component} from 'react'
import CourseCard from './CourseCard'
import Navbar from '../../template/Navbar'
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
        this.search       = this.search.bind(this)
        this.fetchCourses = this.fetchCourses.bind(this)
    }
    search(searchText) {
       this.setState({
           filteredCourses: this.state.courses.filter(course => {
                return course.name.toLowerCase().includes(searchText.toLowerCase())
           })
       })
    }
    fetchCourses() {
        fetch(`${this.props.backendURL}/api/courses/`, {
            headers: {
                'Authorization': this.props.getJWTHeader()
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
                <Navbar
                    title='AMT'
                    showSearchBar
                    searchCallback={this.search}
                    showSettings
                />
                <section id="list-courses-content">
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