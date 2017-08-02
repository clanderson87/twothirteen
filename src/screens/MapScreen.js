import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { FormInput, List, ListItem } from 'react-native-elements';
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
            { this.props.results && this.props.results.length > 1 ? <List>{ this.props.results.map((rest, i) => (
              <ListItem
                key = {i}
                title = {rest.name}
                subtitle = {rest.address}
                onPress = {() => console.log(rest.name)}
              /> ))}</List> : null }
            </View>
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
  const { region, error, input, results } = map;
  return { region, error, input, results };
};

export default connect(mapStateToProps, { 
  getInitialRegion,
  setRegion,
  setInput,
  uploadInputToSearch
})(MapScreen);