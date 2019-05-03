import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import NavItem from './NavItem'

export default class NavBar extends Component {
  render() {
    return (
      <View style={styles.navBar} className='navbar'>
        <NavItem text={1} />
        <NavItem text={2} />
        <NavItem text={3} />
        <NavItem text={4} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    backgroundColor: 'powderblue'
  },
  item: {
    
  }
})
