import React, {Component} from 'react'
import './style.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            renderSignup: false,
            username: '',
            password: '',
            email: '',
            rememberUser: false,
        }
        this.showLoginForm = this.showLoginForm.bind(this)
        this.showSignupForm = this.showSignupForm.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.troubleLoggingIn = this.troubleLoggingIn.bind(this)
    }
    showLoginForm(event) {
        event.preventDefault()
        this.setState({
            renderSignup: false
        })
    }
    showSignupForm(event) {
        event.preventDefault()
        this.setState({
            renderSignup: true
        })
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    login(event) {
        event.preventDefault()
        // implement this
    }
    signup(event) {
        event.preventDefault()
        // implement this
    }
    troubleLoggingIn(event) {
        event.preventDefault()
        // implement this
    }
    render() {
        return (
            <div className="container-fluid">
                <div id="home-page" className="row">
                    <div id="title-col" className="col bg-success">
                        <h1 className="display-1">
                            <kbd>A</kbd>ssessment
                            <br />
                            <kbd>M</kbd>anagement
                            <br />
                            <kbd>T</kbd>ool
                        </h1>
                    </div>
                    <div className="col text-center">
                        <h4 className="display-4"><kbd>AMT</kbd></h4>
                        {!this.state.renderSignup ? 
                            <div className="card">
                                <div className="card-header">LOGIN AS STUDENT</div>
                                <div className="card-body">
                                    <form onSubmit={this.login}>  
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} name="username"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password"/>
                                        </div>
                                        <div className="form-check text-left">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" checked={this.state.rememberUser} onChange={(event) => this.setState({rememberUser: event.target.checked})}/> Remember Me
                                            </label>
                                        </div>
                                        <div className="form-group text-right">
                                            <a href="/" onClick={this.troubleLoggingIn}>Forgot Username/Password?</a>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-block bg-success text-light">LOGIN</button>
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
                                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} name="email"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} name="username"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password"/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-block bg-success text-light">SIGNUP</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center">
                                    Already have an account? <a href="/" onClick={this.showLoginForm}>Log In</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home