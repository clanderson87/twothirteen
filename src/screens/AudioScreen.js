import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
  record,
  pause, 
  finishRecording,
  neautralizeState,
  playRecordedSound,
  uploadSound
} from '../actions';

class AudioScreen extends Component {
  renderAudioButtons = () => {
    let { recording, uri, isPaused, sound, error, previousRecording } = this.props;
    if (error){
      return Alert.alert(
        'Uh-oh',
        error,
        [{ text: 'ok', onPress: () => this.props.neautralizeState()}],
        [{ onDismiss: () => this.props.neautralizeState()}]
      )
    };
    if(recording === undefined) {
      return <Button onPress = {() => this.props.record(console.log('recording!'))} icon = {{ name: 'mic' }}/>
    } else if (recording && !isPaused){
      return (
        <View>
          <Button onPress = {() => this.props.pause(recording)} icon = {{ name: 'pause' }} />
          <Button onPress = {() => this.props.finishRecording(recording)} icon = {{ name: 'stop' }} />
        </View>
      );
    } else if (recording && isPaused) {
      return <Button onPress = {() => this.props.record(console.log('recording!'))} icon = {{ name: 'mic' }} />
    } else if (sound) {
      return (
        <View>
          <Button onPress = {() => this.props.playRecordedSound(this.props.sound)} icon = {{ name: 'play-arrow' }} />
          <Button onPress = {() => this.props.uploadSound(this.props.sound)} icon = {{ name: 'cloud-upload' }} />
        </View>
      )
    }
  }
  
  render() {
    return (
      <View>
        {this.renderAudioButtons()}
      </View>
    );
  }
}

const mapStateToProps = ({ audio }) => {
  const { recording, uri, isPaused, sound, error, previousRecording } = audio; 
  return { recording, uri, isPaused, sound, error, previousRecording };
}

export default connect(mapStateToProps, { 
  record, 
  pause, 
  finishRecording,
  neautralizeState,
  playRecordedSound,
  uploadSound
})(AudioScreen);