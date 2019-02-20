import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Home from './Home'
import ListCourses from './Courses/ListCourses'
import Context from '../context';
import CourseWrapper from './Courses/Wrapper/index'
import Account from './Account'
import ListMyCourses from './Courses/ListMyCourses'
import AddCourse from './Courses/AddCourse'

class AMT extends Component {
    render() {
        return (
            <Context.Consumer>
                {(ctx) => {
                    return (
                        <BrowserRouter>
                            <Switch>
                                <Route 
                                    exact path='/'
                                    render={() => <Redirect to='/home' />}
                                />
                                <Route 
                                    exact path='/home'
                                    render={() => <Home ctx={ctx}/>}
                                />
                                <Route 
                                    exact path='/courses'
                                    render={() => <ListCourses ctx={ctx}/>}
                                />
                                <Route
                                    exact path='/new'
                                    render={() => <AddCourse ctx={ctx}/>}
                                />
                                <Route
                                    exact path='/my-courses'
                                    render={() => <ListMyCourses ctx={ctx}/>}
                                />
                                <Route
                                    exact path='/courses/:c_id'
                                    render={(props) => 
                                        <CourseWrapper 
                                            ctx={ctx}
                                            courseId={props.match.params.c_id}
                                        />
                                    }
                                />
                                <Route 
                                    exact path='/account'
                                    render={() => <Account ctx={ctx}/>}
                                />
                                <Route
                                    path='/admin'
                                    component={() => {
                                        window.location = `${ctx.backendURL}/admin`
                                        return null
                                    }}
                                />
                            </Switch>
                        </BrowserRouter>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default AMT