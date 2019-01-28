import React, {Component} from 'react'
import Settings from '../Settings'
import './style.css'
import { withRouter } from 'react-router';

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: ''
        }
        this.handleChange  = this.handleChange.bind(this)
        this.searchWrapper = this.searchWrapper.bind(this)
        this.titleClicked  = this.titleClicked.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    searchWrapper(event) {
        event.preventtitleDefault()
        this.props.searchCallback(this.state.searchText)
    }
    titleClicked(event) {
        event.preventDefault()
        if (this.props.titleRedirectURL) {
            this.props.history.push(this.props.titleRedirectURL)
        }
    }
    render() {
        return (
            <section id="navigation-bar">
                <nav className="navbar fixed-top">
                    <a href="#" className="navbar-brand" onClick={this.titleClicked}>{this.props.title}</a>
                    <div className="navbar-nav ml-auto">
                        {this.props.showSearchBar && 
                            <div className="nav-item">
                                <form className="form-inline" onSubmit={this.searchWrapper}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="searchText"
                                            value={this.state.searchText}
                                            onChange={this.handleChange}
                                            placeholder={this.props.searchBarText}
                                        />
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                    {this.props.showSettings && <Settings />}
                </nav>
            </section>
        )
    }
}

export default withRouter(Navbar)