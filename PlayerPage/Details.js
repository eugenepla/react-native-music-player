import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Details(props) {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.timer}>{props.getTimestamp}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  },
  timer: {
    fontSize: 44
  }
})
