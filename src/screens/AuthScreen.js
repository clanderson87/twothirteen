import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookLogin, googleLogin } from '../actions';

class AuthScreen extends Component {
  componentDidMount(){
    this.tryLoginProviders();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps){  
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    console.log('On Auth Complete is firing')
    if(props.token && !props.error){
      console.log('props are', props)
      this.props.navigation.navigate('Map');
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
      console.log('google login firing!')
      this.props.googleLogin(googleToken);
      return; 
    }
  }

  render() {
    return (
      <View style = {{flex: 1, justifyContent: 'center'}}>
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
        {this.props.error}
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { error, token } = auth;
  return { error, token };
}

export default connect(mapStateToProps, { facebookLogin, googleLogin })(AuthScreen);