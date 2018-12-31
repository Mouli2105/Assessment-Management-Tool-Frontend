import React, {Component} from 'react'
import './style.css'

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            settingsOpen: false
        }
        this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this)
    }
    toggleSettingsMenu() {
        this.setState(prev => ({
            settingsOpen: !prev.settingsOpen
        }))
    }
    render() {
        return (
            <div className="dropdown">
                <button type="button" id="settings-btn" className="btn bg-light dropdown-toggle" data-toggle="dropdown" onClick={this.toggleSettingsMenu}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-right${this.state.settingsOpen ? ' show' : ''}`}>
                    <a className="dropdown-item" href="/">
                        <img src={require('./profile-avatar.png')} className="rounded" alt="Profile Avatar" id="profile-avatar" /> Account
                    </a>
                    <a className="dropdown-item" href="/">My Courses</a>
                    <a className="dropdown-item" href="/">Settings</a>
                </div>
            </div>
        )
    }
}

export default Settings