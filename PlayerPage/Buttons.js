import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import Slider from 'react-native-slider'
import { MaterialIcons } from '@expo/vector-icons'

const DISABLED_OPACITY = 0.3

export default function Buttons(props) {
  return (
    <View
      style={[
        styles.buttonsContainerBase,
        {
          opacity: props.isLoading ? DISABLED_OPACITY : 1.0
        }
      ]}
    >
      <TouchableHighlight
        onPress={props.onBackPressed}
        disabled={props.isLoading}
      >
        <View>
          <MaterialIcons name="fast-rewind" size={60} color="#022140" />
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={props.onPlayPausePressed}
        disabled={props.isLoading}
      >
        <View>
          {props.isPlaying ? (
            <MaterialIcons name="pause" size={60} color="#56D5FA" />
          ) : (
            <MaterialIcons name="play-arrow" size={60} color="#56D5FA" />
          )}
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={props.onStopPressed}
        disabled={props.isLoading}
      >
        <View>
          <MaterialIcons name="stop" size={60} color="#56D5FA" />
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={props.onForwardPressed}
        disabled={props.isLoading}
      >
        <View>
          <MaterialIcons name="fast-forward" size={60} color="#022140" />
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainerBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
})
