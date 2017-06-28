import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Slides from '../components/Slides';
import { welcomeSlides, readyButtonText, versionNumber } from '../CUSTOM_CONFIG';
import { checkForUsage } from '../actions';

class WelcomeScreen extends Component {
  componentDidMount = async () => {
    await this.props.checkForUsage();
    if(this.props.hasUsed){
      this.onSlidesComplete();
    }
  };
  
  onSlidesComplete = () => {
    if(this.props.token){
      console.log('token is', this.props.token);
      this.props.navigation.navigate('auth');
    } else {
      this.props.navigation.navigate('auth');
    }
  };

  renderSlidesOrNot(){
    if (this.props.loading){
      return <ActivityIndicator size = 'large' />
    } else {
      <Slides 
        data={welcomeSlides} 
        buttonText = {readyButtonText}
        onComplete = {this.onSlidesComplete} />
    }
  }

  render() {
    return (
    <View>
      {this.renderSlidesOrNot()}
    </View>
    )
  }
};

const mapStateToProps = ({ welcome }) => {
  const { hasUsed, token, loading } = welcome;
  return { hasUsed, token, loading }
}

export default connect(mapStateToProps, {
  checkForUsage
})(WelcomeScreen);