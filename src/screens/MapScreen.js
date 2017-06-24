import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fullScreen, fullCentered } from '../styles';
import { getInitialRegion, setRegion } from '../actions';

class MapScreen extends Component {
  componentDidMount(){
    if(this.props.error){
      this.backToAuthScreenOnAuthError()
    };
    this.props.getInitialRegion();
  }

  componentWillReceiveProps(nextProps){
    try {
      if(nextProps.error.hasOwnProperty('type')){
        if (nextProps.error.type === 'authError'){
          this.props.navigation.navigate('auth')
        }
      }
    } catch (e){
      console.log(e);  
    }
  }

  onRegionChangeComplete = (region) => {
    this.props.setRegion(region);
  }

  render() {
    if(this.props.region){
      return (
        <View style = { fullScreen }>
          <MapView 
            style = { fullScreen } 
            region = { this.props.region }
            onRegionChangeComplete = { this.onRegionChangeComplete }/>
        </View>
      )
    } else {
      return (
        <View style = { fullCentered } >
          <ActivityIndicator size = 'large' />
        </View>
      )
    }
  }
}

const mapStateToProps = ({ map }) => {
  const { region, error } = map;
  return { region, error }
};

export default connect(mapStateToProps, { 
  getInitialRegion,
  setRegion
})(MapScreen);