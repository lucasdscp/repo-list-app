import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import repoReducer from './src/reducers/RepoReducer';

import Home from './src/screens/Home';

const store = createStore(repoReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
