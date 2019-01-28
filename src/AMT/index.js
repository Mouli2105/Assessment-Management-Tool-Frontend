import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Home from './Home'
import ListCourses from './Courses/ListCourses'
import Context from '../context';
import CourseWrapper from './Courses/Wrapper/index'

class AMT extends Component {
    render() {
        return (
            <Context.Consumer>
                {(ctx) => {
                    return (
                        <BrowserRouter>
                            <React.Fragment>
                                <Route 
                                    exact path='/'
                                    render={() => <Redirect to='/home' />}
                                />
                                <Route 
                                    exact path='/home'
                                    render={() => <Home {...ctx}/>}
                                />
                                <Route 
                                    exact path='/courses'
                                    render={() => <ListCourses {...ctx}/>}
                                />
                                <Route
                                    exact path='/courses/:c_id'
                                    render={(props) => 
                                        <CourseWrapper 
                                            {...ctx}
                                            courseId={props.match.params.c_id}
                                        />
                                    }
                                />
                            </React.Fragment>
                        </BrowserRouter>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default AMT