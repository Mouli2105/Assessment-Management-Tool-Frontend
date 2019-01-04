import React, {Component} from 'react'

const Context = React.createContext()

class Provider extends Component {
    state = {
        username: 'Mouli'
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