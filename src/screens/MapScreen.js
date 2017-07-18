import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { fullScreen, fullCentered } from '../styles';
import { getInitialRegion, setRegion } from '../actions';
import GOOGLE_PLACES_API_KEY from '../secrets/GOOGLE_PLACES_API_KEY';

class MapScreen extends Component {
  componentDidMount(){
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
          <GooglePlacesAutocomplete
            placeholder =' Search'
            minLength = {2} // minimum length of text to search
            autoFocus = {true}
            listViewDisplayed = 'auto' // true/false/undefined
            fetchDetails = {true}
            renderDescription = {(row) => row.description} // custom description render
            onPress = {(data, details = null) => console.log(data)}
            getDefaultValue={() => {
                return ''; // text input default value
              }}
            
            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
                types: 'establishment', // default: 'geocode'
              }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'prominence',
              type: 'restaurant',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[]}
          />
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