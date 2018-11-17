import React, {Component} from 'react'
import CourseCard from './CourseCard'
import {ClipLoader} from 'react-spinners'
import './style.css'

class Courses extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            courses: [],
            filteredCourses: [],
            settingsOpen: false
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this)
        this.search = this.search.bind(this)
        this.fetchCourses = this.fetchCourses.bind(this)
    }
    handleSearchChange(event) {
        this.setState({
            searchText: event.target.value
        }, () => {
            if (this.state.searchText !== '') {
                this.setState({
                    filteredCourses: this.state.courses.filter(course => course.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
                })
            } else {
                this.setState({
                    filteredCourses: this.state.courses
                })
            }
        })
    }
    toggleSettingsMenu() {
        this.setState(prev => ({
            settingsOpen: !prev.settingsOpen
        }))
    }
    search(event) {
        event.preventDefault()
        // implement this...
    }
    fetchCourses() {
        fetch(`http://my-reddit-webapp.herokuapp.com/api/reddit/r/`).then(res => 
            res.json()
        ).then(data => {
            this.setState({
                courses: data,
                filteredCourses: data,
            })
        }).catch(err => {
            console.log('Fetching Error!', err)
        })
        
    }
    componentDidMount() {
        this.fetchCourses()
    }
    render() {
        return (
            <div className="container-fluid">
                <section id="navigation-bar">
                    <nav className="navbar fixed-top">
                        <a href="/" className="navbar-brand">Courses</a>
                        <div className="navbar-nav ml-auto">
                            <div className="nav-item">
                                <form className="form-inline" onSubmit={this.search}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" name="searchText" value={this.state.searchText} onChange={this.handleSearchChange} placeholder="Search..." />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button type="button" id="settings-btn" className="btn bg-light dropdown-toggle" data-toggle="dropdown" onClick={this.toggleSettingsMenu}>
                                <i className="fa fa-cog" aria-hidden="true"></i>
                            </button>
                            <div className={`dropdown-menu dropdown-menu-right${this.state.settingsOpen ? ' show' : ''}`}>
                                <a className="dropdown-item" href="/">
                                    <img src={require('./profile-avatar.png')} class="rounded" alt="Profile Avatar" id="profile-avatar" /> Account
                                </a>
                                <a className="dropdown-item" href="/">My Courses</a>
                                <a className="dropdown-item" href="/">Settings</a>
                            </div>
                        </div>
                    </nav>
                </section>
                <section id="content">
                    {this.state.courses.length !== 0 ?
                        <div className="card-columns">
                            {this.state.filteredCourses.map(course => 
                                <CourseCard key={course.id} name={course.name} description={course.description} />
                            )}
                        </div>
                    :
                        <div id="loading-spinner">
                            <ClipLoader color='blue'/>
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Courses