import React, {Component} from 'react'

const Context = React.createContext()

class Provider extends Component {
    state = {
        backendURL: 'https://mouli2105.pythonanywhere.com',
        loggedIn: false,
        userId: 1,
        username: '',
        role: '',
        setCurrentUser: (userId, username) => {
            this.setState({
                userId: userId,
                username: username
            })
        },
        setRole: (is_student, is_mentor) => {
            if (is_student) {
                this.setState({
                    role: 'students'
                })
            }
            else if (is_mentor) {
                this.setState({
                    role: 'mentors'
                })
            }
        },
        alreadyLoggedIn: (successCallback, failureCallback) => {
            let token = localStorage.getItem('token')
            if (token) {
                fetch(`${this.state.backendURL}/api/auth/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    })
                }).then(res => {
                    if (res.status < 300) {
                        return res.json()
                    }
                    throw new Error(res.statusText)
                }).then(res => {
                    localStorage.setItem('token', res.token)
                    this.state.setCurrentUser(res.userId, res.username)
                    this.state.setRole(res.is_student, res.is_mentor)
                    if (successCallback) successCallback()
                }).catch(err => {
                    console.log(err)
                    localStorage.removeItem('token')
                    if (failureCallback) failureCallback()
                })
            }
            else {
                if (failureCallback) failureCallback()
            }
        },
        getJWTHeader: () => {
            return `JWT ${localStorage.getItem('token')}`
        }
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export {Provider}
export default Context