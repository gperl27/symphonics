import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux'

import InputContainer from './InputContainer'
import MusicControls from './MusicControls'

import { setMusic } from '../modules/music'

class App extends Component {
  componentDidMount() {
    if (!this.props.player) { this.props.setMusic() }
  }

  render() {
    return (
      <div>
        <InputContainer />
        <MusicControls />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setMusic,
}, dispatch)

export default compose(
  connect(null, mapDispatchToProps)
)(App)