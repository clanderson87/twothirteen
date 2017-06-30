import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Picker } from 'react-native';
import { FormLabel, FormInput, CheckBox } from 'react-native-elements';
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


  renderAddFormStepByStep = () => {
    switch(this.props.step) {
      case 'amount needed':
        return (
          <View>
            <FormLabel>Amount</FormLabel>
            <FormInput 
              onChangeText = {(text) => this.props.tipAmountChanged()} 
              keyboardType = 'numeric'
            />
          </View>
        );
      case 'date needed':
        return (
          <View>
            {/*Calendar Solution */}
          </View>
        )
    }
  }


  render(){
    return (
      <View style = {{ flex: 1, justifyContent: 'center'}} >
        <FormLabel>Amount</FormLabel>
        <FormInput 
          onChangeText = {(text) => this.props.tipAmountChanged()} 
          keyboardType = 'numeric'
        />
        <FormLabel>Place</FormLabel>
        <Picker
          selectedValue = { this.props.tipShift }
          onValueChange = {(shift) => this.props.tipShiftChanged(shift)}
        >
          <Picker.Item label = 'Breakfast' value = 'breakfast' />
          <Picker.Item label = 'Brunch' value = 'brunch' />
          <Picker.Item label = 'Lunch' value = 'lunch' />
          <Picker.Item label = 'Happy Hour' value = 'happy hour' />
          <Picker.Item label = 'Dinner' value = 'dinner' />
          <Picker.Item label = 'Late Night' value = 'late night' />
        </Picker>
      </View>
    )
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