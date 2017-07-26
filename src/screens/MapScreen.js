import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { fullScreen, fullCentered } from '../styles';
import { getInitialRegion, setRegion } from '../actions';
import GOOGLE_PLACES_API_KEY from '../secrets/GOOGLE_PLACES_API_KEY';

class MapScreen extends Component {
  componentDidMount(){
    this.props.getInitialRegion();
  }

  componentWillReceiveProps(nextProps){
    
  }

  onRegionChangeComplete = (region) => {
    this.props.setRegion(region);
  }

  render() {
    if(this.props.region){
      return (
        <View style = { fullScreen }>
          <FormInput />
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