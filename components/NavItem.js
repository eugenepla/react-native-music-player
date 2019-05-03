import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class NavItem extends Component {
  render() {
    const {text} = this.props
    return (
      <View style={styles.navItem}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navItem: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  text: {
    color: 'green'
  }
})
