import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import data from '../data'
import TrackList from './TrackList'
import NavBar from './NavBar'

export default class Main extends Component {
  render() {
    return (
      <View style={styles.page}>
        <TrackList data={data} />
        <NavBar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 3,
    justifyContent: 'space-between'
  }
})
