import React, {Component} from 'react'
import Settings from '../Settings'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: ''
        }
        this.handleChange  = this.handleChange.bind(this)
        this.searchWrapper = this.searchWrapper.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    searchWrapper(event) {
        event.preventDefault()
        this.props.searchCallback(this.state.searchText)
    }
    render() {
        return (
            <section id="navigation-bar">
                <nav className="navbar fixed-top">
                    <a href="# > __ < " className="navbar-brand" onClick={this.props.titleRedirect}>{this.props.title}</a>
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

export default Navbar