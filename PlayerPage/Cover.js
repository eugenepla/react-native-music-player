import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

export default function Cover(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.portrait }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  },
  image: {
    height: 200,
    width: 200
  }
})
