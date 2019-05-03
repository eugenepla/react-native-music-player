import React from 'react'
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default function Track(props) {
  return (
    <TouchableOpacity 
      onPress={() => Actions.player(props)}
      style={styles.container}
    >
      <Image
        style={{width: 75, height: 75}}
        source={{uri: props.cover}}
      />  
      <View style={styles.trackText}>
        <Text>{props.song}</Text>
        <Text>{props.artist}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  trackText: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
