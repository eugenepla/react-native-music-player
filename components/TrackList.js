import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'

import Track from './Track'

export default class TrackList extends Component {
  render() {
    const data = this.props.data
    return (
      <View style={styles.container}>
        {data.map((item) => {
          return (
            <Track
              data={data}
              key={item.id}
              artist={item.artist}
              song={item.song}
              cover={item.cover}
            />
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})
