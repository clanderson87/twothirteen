import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { FormInput, List, ListItem, Button } from 'react-native-elements';
import { fullScreen, fullCentered } from '../styles';
import { getInitialRegion, setRegion, setInput, uploadInputToSearch, hideResults, setRestaurant, saveRestaurant } from '../actions';

class MapScreen extends Component {
  componentDidMount(){
    this.props.getInitialRegion();
  }

  componentWillReceiveProps(nextProps){
    
  }

  onRegionChangeComplete = (region) => {
    this.props.setRegion(region);
  }

  selectRestaurant = rest => {
    this.props.setRestaurant(rest);
    const { locLat, locLng } = rest;
    let newRegion = {
      latitudeDelta: 0.09,
      longitudeDelta: 0.045,
      latitude: locLat,
      longitude: locLng
    };
    this.props.setRegion(newRegion);
    this.props.hideResults();
  }

  render() {
    let topSearchOffset = Math.round(Dimensions.get('window').height * 0.1);
    let sideSearchOffset = Math.round(Dimensions.get('window').width * 0.1);
    let buttonBottomOffset = Math.round(Dimensions.get('window').height * 0.1);
    if(this.props.region){
      return (
        <View style = { fullScreen }>
          <View
            style = {{
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
            }}>
            <FormInput 
              placeholder = 'search'
              onChangeText = { (text) => this.props.setInput(text) }
              value = {this.props.input}
              onEndEditing = { () => this.props.uploadInputToSearch(this.props.input, this.props.region)} />
            { this.props.results && this.props.results.length > 0 ? 
              <List>{ this.props.results.map((rest, i) => (
                <ListItem
                  key = {i}
                  title = {rest.name}
                  subtitle = {rest.address}
                  onPress = {() => this.selectRestaurant(rest)}
                /> ))
              }</List> 
              : null }
            </View>
          <MapView 
            style = {{ flex: 4 }} 
            region = { this.props.region }
            onRegionChangeComplete = { this.onRegionChangeComplete }/>
          { this.props.rest ? 
          <View style = {{
            flexDirection: 'row',
            bottom: topSearchOffset,
            left: sideSearchOffset,
            right: sideSearchOffset,
            alignSelf: 'center',
            position: 'absolute'
          }}>
            <Button containerViewStyle = {{
              flex: 1,
              zIndex: 500,
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 0
              }
            }} title = 'Save' onPress = { () => this.props.saveRestaurant(this.props.rest) } />
            <Button containerViewStyle = {{
              flex: 1,
              zIndex: 500,
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 0
              }
            }} title = 'Back' onPress = { () => console.log('Back!') } />
          </View> : null }
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
  const { region, error, input, results, rest } = map;
  return { region, error, input, results, rest };
};

export default connect(mapStateToProps, { 
  getInitialRegion,
  setRegion,
  setInput,
  uploadInputToSearch,
  hideResults,
  setRestaurant,
  saveRestaurant
})(MapScreen);