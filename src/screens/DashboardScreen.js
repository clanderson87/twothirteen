import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { CLEAR, IOS_BLUE } from '../colors';
import { OS } from '../styles';
import { 
  getInitial,
  getRestaurants,
  addTip,
  selectTip,
  unselectTip,
} from '../actions';
import { addItemToUser } from '../actions/firebase_helpers';

class DashboardScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Dashboard',
    headerRight: (
      <Button title='Settings' 
        onPress={() => navigation.navigate('Settings')}
        backgroundColor={CLEAR}
        color={IOS_BLUE}
        style={{marginTop: OS === 'android' ? 24 : 0 }}
      />
    )
  })

  renderList = () => {
    
  };

  renderRow = () => {
    
  };

  render() {
    return (
      <View>
        {this.renderList()}
        <Button onPress = {() => addItemToUser('Hello', 'words')} title = {'upload'} />
      </View>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  const { 
    usersTips,
    usersAverage,
    usersProjected,
    usersRestaurants,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant, //NB: once RESTAURANTS_AQUIRED fires, tipRestaurant shouldn't be defaulted back to null
    selectedTip
  } = dashboard;
  return { 
    usersTips,
    usersAverage,
    usersProjected,
    usersRestaurants,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant, //NB: once RESTAURANTS_AQUIRED fires, tipRestaurant shouldn't be defaulted back to null
    selectedTip 
  }
}

export default connect(mapStateToProps, {

})(DashboardScreen)