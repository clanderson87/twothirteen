import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { takeOrSelectPicture, toggleCameraOrPicker } from '../actions/camera_actions';
import { fullScreen, imageViewStyle } from '../styles';

class CameraScreen extends Component {
  viewImage = () => {
    if(this.props.image){
      const { image } = this.props;
      let { uri, height, width } = image;
      width = width / 8;
      height = height / 4.5;
      return (
        <Image source = {{ uri }} style={imageViewStyle(height)} resizeMode = 'contain' />
      )
    }
  }

  pickerOrNotPicker = () => {
    if(this.props.picker === false){
      return 'Switch To Picker';
    } else {
      return 'Switch to camera';
    }
  }

  render() {
    return (
      <View style = {{ justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
        <View style = {{ flex: 5 }}>
          {this.viewImage()}
        </View>
        <View style = {{ flex: 1 }}>
          <Button onPress = {() => this.props.takeOrSelectPicture(this.props.picker)} title={'camera'} />
          <Button onPress = {() => this.props.toggleCameraOrPicker(this.props.picker)} title={this.pickerOrNotPicker()} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ camera }) => {
  const { image, picker } = camera;
  return { image, picker };
}

export default connect(mapStateToProps, { 
  takeOrSelectPicture, 
  toggleCameraOrPicker 
})(CameraScreen);