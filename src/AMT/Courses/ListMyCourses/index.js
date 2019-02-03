import React, {Component} from 'react'
import withRouter from 'react-router/withRouter'
import {ClipLoader} from 'react-spinners'
import Navbar from '../../template/Navbar'
import CourseCard from '../../template/CourseCard'
import './style.css'

class ListMyCourses extends Component {
    constructor() {
        super()
        this.state = {
            loadedData: false,
            optedCourses: []
        }
        this.fetchMyCourses = this.fetchMyCourses.bind(this)
    }
    fetchMyCourses() {
        fetch(`${this.props.ctx.backendURL}/api/${this.props.ctx.role}/${this.props.ctx.userId}/`, {
            headers: {
                Authorization: this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(account => {
            this.setState({
                loadedData: true,
                optedCourses: account.optedCourses
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.props.ctx.alreadyLoggedIn(
            () => {
                this.fetchMyCourses()
            },
            () => this.props.history.push('/home')
        )
    }
    render() {
        return (
            <React.Fragment>
                <Navbar 
                    title='Courses'
                    titleRedirectURL='/courses'
                    showSettings
                />
                {this.state.loadedData ?
                    <div className="container-fluid">
                        {this.state.optedCourses.length ? 
                            <section className="list-courses-content">
                                <div className="card-columns">
                                    {this.state.optedCourses.map(course => 
                                        <CourseCard 
                                            key={course.id}
                                            id={course.id}
                                            name={course.name} 
                                            description={course.description}
                                        />
                                    )}
                                </div>
                            </section>
                            :
                            <div></div>
                        }
                    </div>
                    :
                    <div id="my-courses-loader">
                        <ClipLoader />
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(ListMyCourses)