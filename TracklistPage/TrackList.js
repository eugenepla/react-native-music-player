import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import Track from './Track'

export default class TrackList extends Component {
  render() {
    const data = this.props.data
    return (
      <ScrollView style={styles.container}>
        {data.map(item => {
          return (
            <Track
              style={styles.trackContainer}
              data={data}
              id={item.id}
              key={item.id}
              artist={item.artist}
              song={item.song}
              cover={item.cover}
            />
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF0'
  }
})
