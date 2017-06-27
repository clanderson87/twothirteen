import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookLogin, googleLogin, testForTokens } from '../actions';

class AuthScreen extends Component {
  componentDidMount(){
    if(!this.props.token && !this.props.error){
      this.props.testForTokens();
      this.onAuthComplete(this.props);
    }
  }

  componentWillReceiveProps(nextProps){
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.provider === 'facebook'){
      props.facebookLogin(props.token);
    }
    
    if (props.provider === 'google'){
      props.googleLogin(props.token);
    };

    if(props.authenticated && !props.error){
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
  const { error, token, authenticated, provider } = auth;
  return { error, token, authenticated, provider };
}

export default connect(mapStateToProps, { facebookLogin, googleLogin, testForTokens })(AuthScreen);