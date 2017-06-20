import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { facebookLogin, googleLogin } from '../actions';

class AuthScreen extends Component {
  componentDidMount(){
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.onAuthComplete(nextProps); 
  }

  onAuthComplete(props) {
    if(props.token){
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
      //when google login needed, create buttons for users to choose which login provider needed.
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token }
}

export default connect(mapStateToProps, { facebookLogin, googleLogin })(AuthScreen);