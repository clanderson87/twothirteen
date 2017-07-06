import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Avatar, List, ListItem, Grid, Row, Col } from 'react-native-elements';
import { connect } from 'react-redux';
import { CLEAR, IOS_BLUE } from '../colors';
import { OS } from '../styles';
import { 
  getInitial,
  getRestaurants,
  selectTip,
  unselectTip,
  checkForBudget
} from '../actions';
import { addItemToUser } from '../actions/firebase_helpers';

class DashboardScreen extends Component {

  componentDidMount(){
    this.props.getInitial();
    this.props.checkForBudget();
    if(!this.props.budget){
      this.props.navigation.navigate('AddBudgetScreen');
    }
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
                rightTitle = { new Date(t.date).toLocaleDateString() }
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

  render() {
    let rowThickness = Dimensions.get('window').height / 7
    return (
      <View style = {{ flex: 1 }}>
      <Grid >
        <Row containerStyle = {{ height: rowThickness }}>
          <Col>
            <Text style = {{ fontSize: 18, textAlign: 'center' }}>average</Text>
            <Text style = {{ fontSize: 36, textAlign: 'center' }}>{this.props.usersAverage}</Text>
          </Col>
          <Col>
            <Text style = {{ fontSize: 18, textAlign: 'center' }}>hourly</Text>
            <Text style = {{ fontSize: 36, textAlign: 'center' }}>{this.props.usersHourlyAvg}</Text>
          </Col>
          <Col>
            <Text style = {{ fontSize: 18, textAlign: 'center' }}>progress</Text>
            <Text style = {{ fontSize: 36, textAlign: 'center' }}>{this.props.usersAverage}</Text>
          </Col>
        </Row>
          {this.renderList()}
          {this.generateAddFAB()}
      </Grid>
      </View>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  const { 
    usersTips,
    usersAverage,
    usersHourlyAvg,
    usersProjected,
    message,
    selectedTip,
    budget
  } = dashboard;
  return { 
    usersTips,
    usersAverage,
    usersHourlyAvg,
    usersProjected,
    message,
    selectedTip,
    budget
  }
}

export default connect(mapStateToProps, {
  getInitial,
  getRestaurants,
  selectTip,
  unselectTip,
  checkForBudget
})(DashboardScreen)