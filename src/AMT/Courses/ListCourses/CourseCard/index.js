import React, {Component} from 'react'
import {withRouter} from 'react-router'
import './style.css'

class CourseCard extends Component {
    constructor(props) {
        super(props)
        this.cardClicked = this.cardClicked.bind(this)
    }
    cardClicked() {
        console.log(this.props)
        this.props.history.push(`/courses/${this.props.id}`)
    }
    render() {
        return (
            <div className="card text-black bg-light course-card" onClick={this.cardClicked}>
                <img className="card-img-top course-card-img" src={require('./course-placeholder.jpg')} alt="Course" />
                <div className="card-body">
                    <h3 className="card-title">{this.props.name}</h3>
                    <p className="card-text">{this.props.description.substring(0, 30)}...</p>
                </div>
            </div>
        )
    }
}

export default withRouter(CourseCard)