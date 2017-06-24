import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookLogin, googleLogin } from '../actions';

class AuthScreen extends Component {
  componentDidMount(){
    if (!this.props.error){
      this.tryLoginProviders();
      this.onAuthComplete(this.props);
    }
  }

  componentWillReceiveProps(nextProps){
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if(props.token && !props.error){
      this.props.navigation.navigate('Map');
    }
  }

  renderErrorMessage = () => {
    if (this.props.error){
      return (
        <Text>{this.props.error.message}</Text>
      )
    }
  }

  tryLoginProviders = async () => {
    let fbToken = await AsyncStorage.getItem('fb_token');
    if (fbToken){
      this.props.facebookLogin(fbToken);
      return; 
    }
    let googleToken = await AsyncStorage.getItem('google_token');
    if (googleToken){
      this.props.googleLogin(googleToken);
      return; 
    }
  }

  render() {
    return (
      <View style = {{flex: 1, justifyContent: 'center'}}>
        {this.renderErrorMessage()}
        <SocialIcon
          type = 'facebook'
          title = 'Sign in with Facebook'
          button
          onPress = { () => this.props.facebookLogin() }
        />
        <SocialIcon
          type = 'google-plus-official'
          title = 'Sign in with Google'
          button
          onPress = { () => this.props.googleLogin() }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { error, token } = auth;
  return { error, token };
}

export default connect(mapStateToProps, { facebookLogin, googleLogin })(AuthScreen);