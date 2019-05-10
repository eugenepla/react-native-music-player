import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, View, Dimensions } from 'react-native'

import Slider from 'react-native-slider'
import { MaterialIcons } from '@expo/vector-icons'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')
const BACKGROUND_COLOR = '#FFFFFF'
const DISABLED_OPACITY = 0.5

export default function Buttons(props) {
  return (
    <View
      style={[
        styles.buttonsContainerBase,
        styles.buttonsContainerTopRow,
        {
          opacity: props.isLoading ? DISABLED_OPACITY : 1.0
        }
      ]}
    >
      <TouchableHighlight
        underlayColor={BACKGROUND_COLOR}
        style={styles.wrapper}
        onPress={props.onBackPressed}
        disabled={props.isLoading}
      >
        <View>
          <MaterialIcons name="fast-rewind" size={40} color="#56D5FA" />
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={BACKGROUND_COLOR}
        style={styles.wrapper}
        onPress={props.onPlayPausePressed}
        disabled={props.isLoading}
      >
        <View>
          {props.isPlaying ? (
            <MaterialIcons name="pause" size={40} color="#56D5FA" />
          ) : (
            <MaterialIcons name="play-arrow" size={40} color="#56D5FA" />
          )}
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={BACKGROUND_COLOR}
        style={styles.wrapper}
        onPress={props.onStopPressed}
        disabled={props.isLoading}
      >
        <View>
          <MaterialIcons name="stop" size={40} color="#56D5FA" />
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={BACKGROUND_COLOR}
        style={styles.wrapper}
        onPress={props.onForwardPressed}
        disabled={props.isLoading}
      >
        <View>
          <MaterialIcons name="fast-forward" size={40} color="#56D5FA" />
        </View>
      </TouchableHighlight>

      <View
        style={[
          styles.playbackContainer,
          {
            opacity: props.isLoading ? DISABLED_OPACITY : 1.0
          }
        ]}
      >
        <Slider
          style={styles.playbackSlider}
          value={props.getSeekSliderPosition}
          onValueChange={props.onSeekSliderValueChange}
          onSlidingComplete={props.onSeekSliderSlidingComplete}
          disabled={props.isLoading}
          thumbTintColor="#000000"
          minimumTrackTintColor="#4CCFF9"
        />
      </View>

      <View
        style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}
      />

      <View style={[styles.buttonsContainerBase]} />
    </View>
  )
}

const styles = StyleSheet.create({})
