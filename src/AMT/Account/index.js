import React, {Component} from 'react'
import Navbar from '../template/Navbar'
import {withRouter} from 'react-router'
import {CircleLoader, BarLoader, MoonLoader, PulseLoader} from 'react-spinners'
import './style.css'

class Account extends Component {
    constructor() {
        super()
        this.state = {
            loadedData: false,
            username  : '',
            college   : '',
            branch    : '',
            section   : '',
            subPage   : 'general',
            currentPwd: '',
            newPwd    : '',
            confirmPwd: '',
        }
        this.fetchUserData = this.fetchUserData.bind(this)
        this.setSubPage    = this.setSubPage.bind(this)
        this.handleChange  = this.handleChange.bind(this)
        this.saveBtn       = this.saveBtn.bind(this)
        this.cancelBtn     = this.cancelBtn.bind(this)
    }
    fetchUserData() {
        fetch(`${this.props.ctx.backendURL}/api/${this.props.ctx.role}/${this.props.ctx.userId}/`, {
        // fetch(`${this.props.ctx.backendURL}/api/students/1/`, {
            headers: {
                'Authorization': this.props.ctx.getJWTHeader()
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(account => {
            this.setState({
                username  : account.user.username,
                email     : account.user.email,
                college   : account.college,
                branch    : account.branch,
                section   : account.section,
                loadedData: true,
            })
        }).catch(err => {
            console.log(err)
        })
    }
    setSubPage(event) {
        event.preventDefault()
        this.setState({
            subPage: event.target.name
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    saveBtn() {
        this.setState({
            loadedData: false
        })
        let JSONBody
        if (this.state.subPage === 'general') {
            JSONBody = {
                college: this.state.college,
                branch : this.state.branch,
                section: this.state.section
            }
        }
        else if (this.state.subPage === 'security') {
            JSONBody = {
                password: this.state.newPwd
            }
        }
        console.log(this.props.ctx.role)
        fetch(`${this.props.ctx.backendURL}/api/${this.props.ctx.role}/${this.props.ctx.userId}`, {
        // fetch(`${this.props.ctx.backendURL}/api/students/1/`, {
            method : 'PATCH',
            headers: {
                "Content-type": "application/json",
                Authorization: this.props.ctx.getJWTHeader()
            },
            body: JSON.stringify(JSONBody)
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
            throw new Error(res.statusText)
        }).then(() => {
            this.setState({
                loadedData: true
            })
        }).catch(err => {
            this.setState({
                loadedData: true
            })
            console.log(err)
        })
    }
    cancelBtn() {
        this.props.history.push('/courses')
    }
    componentDidMount() {
        this.props.ctx.alreadyLoggedIn(
            () => {
                this.fetchUserData()
            },
            () => {
                this.props.history.push('/home')
            }
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
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="card">
                                    <div className="card text-center">
                                        <div className="card-img">
                                            <img 
                                                id="account-avatar" 
                                                className="rounded" 
                                                src={require('./profile-avatar.png')} 
                                                alt="Profile Avatar" 
                                            />
                                        </div>
                                        <p className="card-text">
                                            <b>{this.state.username}</b>
                                        </p>
                                    </div>
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a 
                                                href="/" 
                                                name='general'
                                                className="nav-link" 
                                                onClick={this.setSubPage}
                                                >
                                                General
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a 
                                                href="/"
                                                name='security'
                                                className="nav-link" 
                                                onClick={this.setSubPage}>
                                                Security
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-8">
                                {this.state.subPage === 'general' &&
                                    <div className="card">
                                        <p className="card-header">
                                            Update your personal data...
                                        </p>
                                        <div className="card-body">
                                            <form >
                                                <div className="form-group row">
                                                    <label className='col-3'>Username</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control col-9"
                                                        name="username"
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label className='col-3'>Email</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control col-9"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label className='col-3'>College</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control col-9"
                                                        name="college"
                                                        value={this.state.college}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label className='col-3'>Branch</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control col-9"
                                                        name="branch"
                                                        value={this.state.branch}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label className='col-3'>Section</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control col-9"
                                                        name="section"
                                                        value={this.state.section}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                }
                                {this.state.subPage === 'security' &&
                                    <div className="card">
                                        <p className="card-header">
                                            Update your password for every 3 months...
                                        </p>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-group row">
                                                    <label className="col-6">Current Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="form-control col-6"
                                                        name="currentPwd"
                                                        value={this.state.currentPwd}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <hr />
                                                <div className="form-group row">
                                                    <label className="col-6">New Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="form-control col-6"
                                                        name="newPwd"
                                                        value={this.state.newPwd}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-6">Confirm Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="form-control col-6"
                                                        name="confirmPwd"
                                                        value={this.state.confirmPwd}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                }
                                <div className="text-center">
                                    <button className="btn" style={{'margin-right': '10px'}} onClick={this.saveBtn}>Save</button>
                                    <button className="btn" onClick={this.cancelBtn}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div id="account-loader">
                        <PulseLoader />
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Account)