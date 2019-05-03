import React, {Component} from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import LandingPage from './components/LandingPage'
import Player from './PlayerPage/Player'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="landingpage"
            component={LandingPage}
            title="LandingPage"
          />

          <Scene
            key="player"
            component={Player}
            title="Player"
          />
        </Stack>
      </Router>
    )
  }
}
