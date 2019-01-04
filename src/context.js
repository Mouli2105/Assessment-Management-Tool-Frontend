import React, {Component} from 'react'

const Context = React.createContext()

class Provider extends Component {
    state = {
        baseURL: 'http://localhost:8000'
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