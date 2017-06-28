import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { FormLabel, FormInput, Grid, Row, Col } from 'react-native-elements';
import {
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  addTip,
  deleteTip,
  editTip
} from '../actions';

class AddScreen extends Component {
  
  componentWillMount(){}

  render(){
    <View>
      <FormLabel>Amount</FormLabel>
      <FormInput 
        onChangeText = {(text) => this.props.tipAmountChanged()} 
        keyboardType = 'numeric'
      />
      <FormLabel</FormLabel>
    </View>
  }

  componentDidMount(){}
}

const mapStateToProps = ({ dashboard }) => {
  const {
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant,
    tipNotes, //NB: once RESTAURANTS_AQUIRED fires, tipRestaurant shouldn't be defaulted back to null
    selectedTip,
    usersRestaurants
   } = dashboard;

  return {
    tipAmount,
    tipDate,
    tipRestaurant,
    tipShift,
    tipNotes,
    selectedTip
  }
}

export default connect(mapStateToProps, {
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  addTip,
  deleteTip,
  editTip
})(AddScreen)