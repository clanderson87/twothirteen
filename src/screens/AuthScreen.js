import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookLogin, googleLogin, testForTokens } from '../actions';

class AuthScreen extends Component {
  componentDidMount(){
    if(!this.props.token && !this.props.error){
      this.props.testForTokens();
      this.onAuthComplete(this.props);
    }
    if(this.props.authenticated){
      this.props.navigation.navigate('Dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log('componentWillRecieveProps is being called with', nextProps.authenticated)
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.provider === 'facebook'){
      props.facebookLogin(props.token);
    }
    
    if (props.provider === 'google'){
      props.googleLogin(props.token);
    };

    if(props.authenticated){
      this.props.navigation.navigate('Dashboard');
    }
  }

  renderErrorMessage = () => {
    if(this.props.error){
      return (
        <Text>{this.props.error.message}</Text>
      )
    }
  }

  renderButtonsOrNot(){
    if(!this.props.loading){
       return (
        <View>
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
      )
    } else {
      return <ActivityIndicator size = 'large' />
    }
  }

  render() {
    return (
      <View style = {{flex: 1, justifyContent: 'center'}}>
        {this.renderErrorMessage()}
        {this.renderButtonsOrNot()}
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { error, token, authenticated, provider, loading } = auth;
  return { error, token, authenticated, provider, loading };
}

export default connect(mapStateToProps, { facebookLogin, googleLogin, testForTokens })(AuthScreen);