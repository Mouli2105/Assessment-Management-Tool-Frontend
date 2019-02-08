import React, {Component} from 'react'
import CourseCard from '../../template/CourseCard'
import Navbar from '../../template/Navbar'
import { PropagateLoader } from 'react-spinners'
import {withRouter} from 'react-router'
import './style.css'

class ListCourses extends Component {
    constructor() {
        super()
        this.state = {
            loadedData     : false,
            searchText     : '',
            courses        : [],
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
        fetch(`${this.props.ctx.backendURL}/api/courses/`, {
            headers: {
                'Authorization': this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status < 300) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(data => {
            this.setState({
                loadedData: true,
                courses: data,
                filteredCourses: data,
            })
        }).catch(err => {
            console.log(err)
        })
        
    }
    componentDidMount() {
        this.props.ctx.alreadyLoggedIn(
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
                <section className="list-courses-content">
                    {this.state.loadedData ?
                        <React.Fragment>
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
                                <div class="alert alert-danger">
                                    <strong>ERROR!</strong> No Courses Present.
                                </div>
                            }
                        </React.Fragment>
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