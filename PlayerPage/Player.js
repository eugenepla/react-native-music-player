import React, { Component } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Asset, Audio, Font } from 'expo'

import Cover from './Cover'
import Details from './Details'
import Buttons from './Buttons'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')
const BACKGROUND_COLOR = '#FFFFFF'
const FONT_SIZE = 16
const LOADING_STRING = 'Loading...'

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.index = 0
    this.isSeeking = false
    this.shouldPlayAtEndOfSeek = false
    this.playbackInstance = null
    this.state = {
      playbackInstanceArtist: null,
      playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      volume: 1.0,
      portrait: null
    }
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true
    })
    ;(async () => {
      await Font.loadAsync({
        roboto: require('../assets/fonts/Roboto.ttf')
      })
      this.setState({ fontLoaded: true })
    })()

    this._loadNewPlaybackInstance(false)
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }

    const source = { uri: this.props.data[this.index].url }
    const initialStatus = {
      shouldPlay: playing
    }

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    )
    this.playbackInstance = sound

    this._updateScreenForLoading(false)
  }

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceArtist: null,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      })
    } else {
      this.setState({
        playbackInstanceArtist: this.props.data[this.index].artist,
        playbackInstanceName: this.props.data[this.index].song,
        portrait: this.props.data[this.index].cover,
        isLoading: false
      })
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering
      })
      if (status.didJustFinish) {
        this._advanceIndex(true)
        this._updatePlaybackInstanceForIndex(true)
      }
    } else if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`)
    }
  }

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : this.props.data.length - 1)) %
      this.props.data.length
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true)

    this._loadNewPlaybackInstance(playing)
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync()
      } else {
        this.playbackInstance.playAsync()
      }
    }
  }

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync()
    }
  }

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true)
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
    }
  }

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false)
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
    }
  }

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay
      this.playbackInstance.pauseAsync()
    }
  }

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false
      const seekPosition = value * this.state.playbackInstanceDuration
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition)
      } else {
        this.playbackInstance.setPositionAsync(seekPosition)
      }
    }
  }

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      )
    }
    return 0
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = number => {
      const string = number.toString()
      if (number < 10) {
        return `0${string}`
      }
      return string
    }
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`
    }
    return ''
  }

  render() {
    return !this.state.fontLoaded ? (
      <View />
    ) : (
      <View style={styles.container}>
        <Cover portrait={this.state.portrait} />
        <Details
          playbackInstanceArtist={this.state.playbackInstanceArtist}
          playbackInstanceName={this.state.playbackInstanceName}
          isBuffering={this.state.isBuffering}
          getTimestamp={this._getTimestamp()}
        />
        <Buttons
          isPlaying={this.state.isPlaying}
          isLoading={this.state.isLoading}
          onBackPressed={this._onBackPressed}
          onPlayPausePressed={this._onPlayPausePressed}
          onStopPressed={this._onStopPressed}
          onForwardPressed={this._onForwardPressed}
          getSeekSliderPosition={this._getSeekSliderPosition()}
          onSeekSliderValueChange={this._onSeekSliderValueChange}
          onSeekSliderSlidingComplete={this._onSeekSliderSlidingComplete}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR
  }
})