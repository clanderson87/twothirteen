import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Slides from '../components/Slides';
import { welcomeSlides, readyButtonText, versionNumber } from '../CUSTOM_CONFIG';
import { checkForUsage } from '../actions';

class WelcomeScreen extends Component {
  componentDidMount = async () => {
    AsyncStorage.multiRemove([versionNumber, 'fb_token', 'google_token']) //=> for debugging purposes ONLY!
    await this.props.checkForUsage();
    if(this.props.hasUsed){
      this.onSlidesComplete();
    }
  };
  
  onSlidesComplete = () => {
    if(this.props.token){
      this.props.navigation.navigate('Map');
    } else {
      this.props.navigation.navigate('auth');
    }
  };

  render() {
    return (
    <Slides 
      data={welcomeSlides} 
      buttonText = {readyButtonText}
      onComplete = {this.onSlidesComplete} />
    )
  }
};

const mapStateToProps = ({ welcome }) => {
  const { hasUsed, token } = welcome;
  return { hasUsed, token }
}

export default connect(mapStateToProps, {
  checkForUsage
})(WelcomeScreen);