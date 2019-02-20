import React, { Component } from 'react'
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
        this.fetchRegisteredStudents = this.fetchRegisteredStudents.bind(this)
        this.checkIfUserHasRegistered = this.checkIfUserHasRegistered.bind(this)
        this.changeDisplayPage = this.changeDisplayPage.bind(this)
    }
    changeDisplayPage(newDisplayPage) {
        this.setState({
            displayPage: newDisplayPage
        })
    }
    fetchRegisteredStudents() {
        fetch(`${this.props.ctx.backendURL}/api/courses/${this.props.courseId}/students/`, {
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
                registeredStudents: data
            }, () => {
                if (this.checkIfUserHasRegistered(this.state.registeredStudents, this.props.ctx.userId)) {
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
    checkIfUserHasRegistered(registeredStudents, currentUserId) {
        const std = registeredStudents.find(student => student.id === currentUserId)
        return std !== undefined
    }
    componentDidMount() {
        this.props.ctx.alreadyLoggedIn(() => {
            this.props.ctx.role === 'students' && this.fetchRegisteredStudents()
            this.props.ctx.role === 'mentors' && this.setState({loadedData: true, displayPage: 'material'})
        })
    }
    render() {
        return (
            <React.Fragment>
                {!this.state.loadedData ?
                    <div style={{ position: 'absolute', top: '50%', right: '50%' }}>
                        <ClipLoader />
                    </div>
                    :
                    this.state.displayPage === 'apply' ?
                        <CourseRegister
                            ctx={this.props.ctx}
                            courseId={this.props.courseId}
                            wrapper={{
                                'changeDisplayPage': this.changeDisplayPage
                            }}
                        />
                        :
                        this.state.displayPage === 'material' ?
                            <CourseMaterial
                                ctx={this.props.ctx}
                                courseId={this.props.courseId}
                                wrapper={{
                                    'changeDisplayPage': this.changeDisplayPage
                                }}
                            />
                            :
                            <div></div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Wrapper)