import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { ClipLoader, PulseLoader } from 'react-spinners'
import './style.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            renderSignup: false,
            username    : '',
            email       : '',
            college     : '',
            branch      : '',
            section     : '',
            password    : '',
            rememberUser: false,
            loading     : false,
            clickLoading: false,
        }
        this.showLoginForm     = this.showLoginForm.bind(this)
        this.showSignupForm    = this.showSignupForm.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.login             = this.login.bind(this)
        this.signup            = this.signup.bind(this)
        this.troubleLoggingIn  = this.troubleLoggingIn.bind(this)
    }
    showLoginForm(event) {
        event.preventDefault()
        this.setState({
            renderSignup: false,
            clickLoading: false,
        })
    }
    showSignupForm(event) {
        event.preventDefault()
        this.setState({
            renderSignup: true,
            clickLoading: false,
        })
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    login(event) {
        event.preventDefault()
        this.setState({
            clickLoading: true
        })
        fetch(`${this.props.ctx.backendURL}/api/auth/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => {
            if (res.status < 300) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(res => {
            localStorage.setItem('token', res.token)
            // ADD USERID TO BACKEND
            // this.props.ctx.setCurrentUser(res.userId, res.username)
            this.props.ctx.setRole(res.is_student, res.is_mentor)
            this.props.history.push('/courses')
        }).catch(err => {
            console.log(err)
        })
    }
    signup(event) {
        event.preventDefault()
        this.setState({
            clickLoading: true
        })
        fetch(`${this.props.ctx.backendURL}/api/students/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username : this.state.username,
                    email    : this.state.email,
                    password : this.state.password
                },
                college      : this.state.college,
                branch       : this.state.branch,
                section      : this.state.section,
                optedCourses : [],
                registrations: []
            })
        }).then(res => {
            if (res.status < 300) {
                return res.json()
            }
            throw new Error('Server reponse was not ok!')
        }).then(res => {
            localStorage.setItem('token', res.token)
            // ADD USERID TO BACKEND
            // this.props.ctx.setCurrentUser(res.userId, res.username)
            this.props.ctx.setRole(res.is_student, res.is_mentor)
            this.props.history.push('/courses')
        }).catch(err => {
            console.log(err.message);
        })
    }
    troubleLoggingIn(event) {
        event.preventDefault()
        // implement this
    }
    componentDidMount() {
        this.props.ctx.alreadyLoggedIn(
            () => {
                this.props.history.push('/courses')
            }
        )
    }
    render() {
        return (
            <div className="container-fluid">
                <div id="home-page" className="row">
                    <div id="title-col" className="col-sm-8 bg-success my-col">
                        <h1 className="display-1">
                            <kbd>A</kbd>ssessment
                            <br />
                            <kbd>M</kbd>anagement
                            <br />
                            <kbd>T</kbd>ool
                        </h1>
                    </div>
                    <div className="col-sm-4 text-center my-col">
                        <h4 className="display-4"><kbd>AMT</kbd></h4>
                        {!this.state.renderSignup ? 
                            <div className="card">
                                <div className="card-header">LOGIN</div>
                                <div className="card-body">
                                    <form onSubmit={this.login}>  
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} name="username" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" required/>
                                        </div>
                                        {/* <div className="form-check text-left">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" checked={this.state.rememberUser} onChange={(event) => this.setState({rememberUser: event.target.checked})}/> Remember Me
                                            </label>
                                        </div>
                                        <div className="form-group text-right">
                                            <a href="/" onClick={this.troubleLoggingIn}>Forgot Username/Password?</a>
                                        </div> */}
                                        <div className="form-group">
                                            <button className="btn btn-block bg-success text-light">
                                                {this.state.clickLoading ?
                                                    <PulseLoader />
                                                    :
                                                    'LOGIN'
                                                }    
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center">
                                    Don't have an account? <a href="/" onClick={this.showSignupForm}>Sign Up</a>
                                </div>
                            </div>
                            :
                            <div className="card">
                                <div className="card-header">SIGNUP AS STUDENT</div>
                                <div className="card-body">
                                    <form onSubmit={this.signup}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} name="username" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} name="email" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="College" value={this.state.college} onChange={this.handleInputChange} name="college" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Branch" value={this.state.branch} onChange={this.handleInputChange} name="branch" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Section" value={this.state.section} onChange={this.handleInputChange} name="section" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" required/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-block bg-success text-light">
                                                {this.state.clickLoading ?
                                                    <PulseLoader />
                                                    :
                                                    'SIGNUP'
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center">
                                    Already have an account? <a href="/" onClick={this.showLoginForm}>Log In</a>
                                </div>
                            </div>
                        }
                    </div>
                    {this.state.loading &&
                        <div id='home-loading'>
                            <ClipLoader color='blue'/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Home)