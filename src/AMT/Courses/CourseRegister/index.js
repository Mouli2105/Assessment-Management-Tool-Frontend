import React, {Component} from 'react'
import Settings from '../../template/Settings'
import './style.css'

class CourseRegister extends Component {
    render() {
        return (
            <div className="container-fluid">
                <section id="navigation-bar">
                    <nav className="navbar fixed-top">
                        <a href="/" className="navbar-brand">AMT</a>
                        <Settings />
                    </nav>
                </section>
                <div className="contaiener-fluid my-top-space">
                    <div className="row">
                        <div className="col">
                            <h1 className="text-center display-1">Course Name</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseRegister