import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Avatar, List, ListItem } from 'react-native-elements';
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
  };

  goToTipDetail = t => {
    this.props.selectTip(t);
    //this.props.navigation.navigate('detail')
    console.log('placeholder for navigation to tip detail! for ', t);
  }

  goToAddTip = () => {
    this.props.unselectTip();
    this.props.navigation.navigate('AddTip');
  }

  renderList = () => {
    if(this.props.usersTips){
      return (
        <List>
          {
            this.props.usersTips.map((t, i) => (
              <ListItem
                key = { i }
                title = { t.amount }
                onPress = {() => this.goToTipDetail(t)}
                hideChevron
              />
            ))
          }
        </List>
      )
    } else {
      return <Text> Add some tips to get started!</Text>
    }
  };

  generateAddFAB = () => {
    let topFabOffset = Math.round(Dimensions.get('window').height * 0.7);
    let leftFabOffset = Math.round(Dimensions.get('window').width * 0.75);
    return (
      <Avatar
          medium
          rounded
          onPress = {() => this.goToAddTip()}
          icon = {{ name: 'add' }}
          overlayContainerStyle={{ backgroundColor: 'green' }}
          activeOpacity = { 0.7 }
          containerStyle = {{
            zIndex: 500,
            alignSelf: 'center',
            position: 'absolute',
            top: topFabOffset,
            left: leftFabOffset,
            right: leftFabOffset,
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 0
            }
          }}
        />
    )
  }

  renderRow = () => {
    
  };

  render() {
    return (
      <View>
        {this.renderList()}
        {this.generateAddFAB()}
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