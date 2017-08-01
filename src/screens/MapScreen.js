import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { fullScreen, fullCentered } from '../styles';
import { getInitialRegion, setRegion, setInput, uploadInputToSearch } from '../actions';

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
    let topSearchOffset = Math.round(Dimensions.get('window').height * 0.1);
    let sideSearchOffset = Math.round(Dimensions.get('window').width * 0.1);
    if(this.props.region){
      return (
        <View style = { fullScreen }>
          <FormInput
            containerStyle = {{
              zIndex: 500,
              alignSelf: 'center',
              position: 'absolute',
              top: topSearchOffset,
              left: sideSearchOffset,
              right: sideSearchOffset,
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 0
              }
            }}
            placeholder = 'search'
            onChangeText = { (text) => this.props.setInput(text) }
            value = {this.props.input}
            onEndEditing = { () => this.props.uploadInputToSearch(this.props.input, this.props.region)} />
          <MapView 
            style = {{ flex: 4 }} 
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
  const { region, error, input } = map;
  return { region, error, input };
};

export default connect(mapStateToProps, { 
  getInitialRegion,
  setRegion,
  setInput,
  uploadInputToSearch
})(MapScreen);