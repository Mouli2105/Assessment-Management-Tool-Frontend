import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import CourseMaterial from '../CourseMaterial'
import CourseRegister from '../CourseRegister'

class Wrapper extends Component {
    constructor() {
        super()
        this.state = {
            loadedData: false,
            displayPage: '',
            registeredStudents: []
        }
        this.fetchRegisteredStudents  = this.fetchRegisteredStudents.bind(this)
        this.checkIfUserHasRegistered = this.checkIfUserHasRegistered.bind(this)
        this.changeDisplayPage        = this.changeDisplayPage.bind(this)
    }
    changeDisplayPage(newDisplayPage) {
        this.setState({
            displayPage: newDisplayPage
        })
    }
    fetchRegisteredStudents() {
        fetch(`${this.props.backendURL}/api/courses/${this.props.courseId}/students/`, {
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
                registeredStudents: data
            }, () => {
                if (this.checkIfUserHasRegistered(this.state.registeredStudents, this.props.userId)) {
                    this.setState({
                        loadedData: true,
                        displayPage: 'material'
                    })
                }
                else {
                    this.setState({
                        loadedData: true,
                        displayPage: 'apply'
                    })
                }
            })
        }).catch(err => {
            console.log(err);
        })
            
    }
    checkIfUserHasRegistered(registeredStudents, currentUser) {
        for (let i = 0; i < registeredStudents.length; i++) {
            if (registeredStudents.id === currentUser.id) {
                return true;
            }
        }
        return false;
    }
    componentDidMount() {
        this.fetchRegisteredStudents()
    }
    render() {
        return (
            <React.Fragment>
                {!this.state.loadedData ?
                    <div style={{position: 'absolute', top: '50%', right: '50%'}}>
                        <ClipLoader />
                    </div>
                    :
                    this.state.displayPage === 'apply' ?
                        <CourseRegister {...this.props}/>
                        :
                        this.state.displayPage === 'material' ?
                            <CourseMaterial {...this.props}/>
                            :
                            <div></div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Wrapper)