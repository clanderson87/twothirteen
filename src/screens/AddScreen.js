import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Picker, 
  FlatList, 
  TouchableOpacity, 
  TouchableNativeFeedback,
  Text
} from 'react-native';
import { 
  FormLabel, 
  FormInput, 
  CheckBox, 
  Card,
  Button,
  Divider,
  Rating,
  Grid,
  Row
} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { OS } from '../styles'
import {
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipNotesChanged,
  tipRatingChanged,
  addTip,
  deleteTip,
  editTip,
  stepChanged
} from '../actions';

class AddScreen extends Component {
  
  componentWillMount(){}

  componentWillReceiveProps(nextProps){
    if(nextProps.navigateTo){
      this.props.navigation.navigate(nextProps.navigateTo);
    }
  }

  renderRestaurantCard = restaurant => {
    console.log('in rRC, restaurant is:', restaurant);
    return (
      <Card
        image = {restaurant.imageUrl}
        title = {restaurant.name}
      >
        <Text style = {{ marginBottom: 10 }}>
          {restaurant.address}
        </Text>
      </Card>
    );
  };

  renderEndDatePicker = () => {
    return ( 
      <DateTimePicker
        mode = 'time'
        isVisible = { true }
        onConfirm = {(shift) => {this.props.tipShiftChanged(shift), this.props.stepChanged('other needed')}}
        onCancel = {() => this.props.stepChanged('date needed')}
        titleIOS = 'When did your shift end?'
        cancelTextIOS = 'Go back'
        is24Hour = { false }
      /> 
    )
  }

  skipRestaurantSelection = () => {
    this.props.tipRestuarantChanged(this.props.usersRestaurants[0]);
    this.props.stepChanged('date needed');
  }

  fromAmount = () => {
    this.props.usersRestaurants.length === 1 ? 
      this.skipRestaurantSelection() : 
      this.props.stepChanged('restaurant needed');
  }

  renderAddFormStepByStep = () => {
    switch(this.props.step) {
      case 'amount needed':
        return (
          <View>
            <FormLabel style = {{ alignSelf: 'center' }} >Amount</FormLabel>
            <FormInput 
              onChangeText = {(tip) => this.props.tipAmountChanged(tip)} 
              keyboardType = 'numeric'
              onEndEditing = {() => this.fromAmount()}
              value = {this.props.tipAmount}
            />
            {
              this.props.message ? 
              <Text>{this.props.message}</Text> :
              null
            }
            <Button
              style = {{ marginVertical: 40 }}
              onPress = {() => this.fromAmount()} 
              title = 'next' />
          </View>
        );
      case 'restaurant needed':
        return (
          <View>
            <FlatList
              data = {this.props.usersRestaurants}
              keyExtractor = { item => item.gId }
              renderItem = {({item}) => {
                return (
                OS === 'ios' ?
                <TouchableOpacity
                  onPress = {() => {this.props.tipRestuarantChanged(item), this.props.stepChanged('date needed')}}>
                  {this.renderRestaurantCard(item)}
                </TouchableOpacity>
                :
                <TouchableNativeFeedback
                  onPress = {() => {this.props.tipRestuarantChanged(item), this.props.stepChanged('date needed')}}>
                  {this.renderRestaurantCard(item)}
                </TouchableNativeFeedback>
                )
              }}
            />
          </View>
        );
      case 'date needed':
        return (
          <DateTimePicker
            mode = 'datetime'
            isVisible = { true }
            onConfirm = {(date) => {this.props.tipDateChanged(date), this.props.stepChanged('shift needed')}}
            onCancel = {() => this.props.stepChanged('restaurant needed')}
            titleIOS = 'When did your shift start?'
            cancelTextIOS = 'Go back'
            is24Hour = { false }
          />
        );
      case 'shift needed':
        return (
          OS === 'ios' ?
          this.renderEndDatePicker()
          :
          <TouchableNativeFeedback
            onPress = {() => { return (this.renderEndDatePicker())}}>
            <View style = {{ flex: 1, backgroundColor: 'green' }}>
              <Text>Set Shift End Time</Text>
            </View>
          </TouchableNativeFeedback>
        );
      case 'other needed':
        return (
          <View style = {{ justifyContent: 'space-around' }}>
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={3.0}
              imageSize={50}
              onFinishRating={(rating) => this.props.tipRatingChanged(rating)}
              style = {{ alignItems: 'center' }}
            />
            <Divider style = {{ marginVertical: 40 }} />
            <FormLabel style = {{ alignItems: 'center' }}>Notes</FormLabel>
            <FormInput style = {{ height: 100 }}
              multiline = {true}
              onChangeText = {(text) => this.props.tipNotesChanged(text)} 
            />
            <Divider style = {{ marginVertical: 40 }} />
            <Button
              onPress = {() => this.props.addTip({
                amount: this.props.tipAmount,
                restaurant: this.props.tipRestaurant,
                date: this.props.tipDate,
                shift: this.props.tipShift,
                notes: this.props.tipNotes,
                rating: this.props.tipRating
              })}
              title = 'Add tip' />
          </View>
        );
    }
  }

  render(){
    return (
      <View style = {{ flex: 1, justifyContent: 'center'}}>
        {this.renderAddFormStepByStep()}
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
    tipRating,
    selectedTip,
    step,
    usersRestaurants,
    navigateTo,
    message
   } = dashboard;

  return {
    tipAmount,
    tipDate,
    tipRestaurant,
    tipShift,
    tipNotes,
    tipRating,
    selectedTip,
    step,
    usersRestaurants,
    navigateTo,
    message
  }
}

export default connect(mapStateToProps, {
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipRatingChanged,
  tipNotesChanged,
  addTip,
  deleteTip,
  editTip,
  stepChanged
})(AddScreen)