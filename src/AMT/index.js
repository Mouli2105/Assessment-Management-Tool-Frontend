import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Home from './Home'
import ListCourses from './ListCourses'
import DetailCourse from './DetailCourse'

class AMT extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route 
                        exact path='/'
                        render={() => <Redirect to='/home' />}
                    />
                    <Route 
                        exact path='/home'
                        component={Home}
                    />
                    <Route 
                        exact path='/courses'
                        component={ListCourses}
                    />
                    <Route 
                        exact path='/courses/:c_id'
                        component={DetailCourse}
                    />

                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default AMT