import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const FONT_SIZE = 16
const BUFFERING_STRING = 'Buffering...'

export default function Details(props) {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.text}>{props.playbackInstanceArtist}</Text>
      <Text style={styles.text}>{props.playbackInstanceName}</Text>

      <Text style={styles.text}>
        {props.isBuffering ? BUFFERING_STRING : props.getTimestamp}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    height: 40,
    marginTop: 40,
    alignItems: 'center'
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE
  }
})
