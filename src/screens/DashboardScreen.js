import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { CLEAR, IOS_BLUE } from '../colors';
import { OS } from '../styles';
import { 
  getInitial,
  getRestaurants,
  selectTip,
  unselectTip,
} from '../actions';
import { addItemToUser } from '../actions/firebase_helpers';

class DashboardScreen extends Component {

  componentDidMount(){
    this.props.getInitial();
    //this.props.getRestaurants();
  }

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
    message,
    selectedTip
  } = dashboard;
  return { 
    usersTips,
    usersAverage,
    usersProjected,
    message,
    selectedTip 
  }
}

export default connect(mapStateToProps, {
  getInitial,
  getRestaurants,
  selectTip,
  unselectTip
})(DashboardScreen)