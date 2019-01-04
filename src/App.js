import React, { Component } from 'react';
import AMT from './AMT'
import {Provider} from './context'

class App extends Component {
  render() {
    return (
      <Provider>
        <AMT />
      </Provider>
    );
  }
}

export default App;
