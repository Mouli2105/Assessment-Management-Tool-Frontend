import React, {Component} from 'react'
import {withRouter} from 'react-router'
import './style.css'

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            settingsOpen: false
        }
        this.toggleSettingsMenu  = this.toggleSettingsMenu.bind(this)
        this.logout              = this.logout.bind(this)
        this.redirectToAccount   = this.redirectToAccount.bind(this)
        this.redirectToMyCourses = this.redirectToMyCourses.bind(this)
    }
    toggleSettingsMenu() {
        this.setState(prev => ({
            settingsOpen: !prev.settingsOpen
        }))
    }
    logout(event) {
        event.preventDefault()
        localStorage.removeItem('token')
        this.props.history.push('/home')
    }
    redirectToAccount(event) {
        event.preventDefault()
        this.props.history.push('/account')
    }
    redirectToMyCourses(event) {
        event.preventDefault()
        this.props.history.push('/my-courses')
    }
    render() {
        return (
            <div className="dropdown">
                <button type="button" id="settings-btn" className="btn bg-light dropdown-toggle" data-toggle="dropdown" onClick={this.toggleSettingsMenu}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-right${this.state.settingsOpen ? ' show' : ''}`}>
                    <a className="dropdown-item" href="/" onClick={this.redirectToAccount}>
                        <img src={require('./profile-avatar.png')} className="rounded" alt="Profile Avatar" id="profile-avatar" /> Account
                    </a>
                    <a className="dropdown-item" href="/" onClick={this.redirectToMyCourses}>My Courses</a>
                    {/* <a className="dropdown-item" href="/">Settings</a> */}
                    <a className="dropdown-item" href="/" onClick={this.logout}>Logout</a>
                </div>
            </div>
        )
    }
}

export default withRouter(Settings)