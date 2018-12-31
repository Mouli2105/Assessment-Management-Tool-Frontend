import React, {Component} from 'react'
import Home from './Home'
import ListCourses from './ListCourses'
import DetailCourse from './DetailCourse'

class AMT extends Component {
    render() {
        return (
            <React.Fragment>
                <Home />
                {/* <ListCourses /> */}
                {/* <DetailCourse courseID={2}/> */}
            </React.Fragment>
        )
    }
}

export default AMT