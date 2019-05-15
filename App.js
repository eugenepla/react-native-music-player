import React, { Component } from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import LandingPage from './TracklistPage/LandingPage'
import Player from './PlayerPage/Player'

export default class App extends Component {
  render() {
    return (
      <Router
        navigationBarStyle={{
          backgroundColor: '#022140'
        }}
        titleStyle={{
          color: '#FFE400',
          fontSize: 22
        }}
        tintColor="#FFE400"
        headerLayoutPreset="center"
      >
        <Stack key="root">
          <Scene key="landingpage" component={LandingPage} title="Tracklist" />
          <Scene
            titleStyle={{ fontSize: 16, alignSelf: 'center' }}
            key="player"
            component={Player}
          />
        </Stack>
      </Router>
    )
  }
}
