import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default function Track(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        Actions.player({ ...props, title: `${props.artist} - ${props.song}` })
      }
      style={styles.container}
    >
      <Image
        style={{ width: 125, height: 120 }}
        source={{ uri: props.cover }}
      />
      <View style={styles.trackText}>
        <Text style={styles.songTitle}>{props.song}</Text>
        <Text style={styles.artistTitle}>{props.artist}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  trackText: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEAE5'
  },
  songTitle: {
    textAlign: 'center',
    color: '#123C69',
    fontSize: 18,
    fontWeight: '600'
  },
  artistTitle: {
    textAlign: 'center',
    color: '#2D283E',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
