import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Picker, 
  FlatList, 
  TouchableOpacity, 
  TouchableNativeFeedback
} from 'react-native';
import { 
  FormLabel, 
  FormInput, 
  CheckBox, 
  Card,
  Rating
} from 'react-native-elements';
//import { Calendar } from 'react-native-calendars';
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

  renderRestaurantCard = rest => {
    <Card
      image = {restaurant.imageUrl}
      title = {restaurant.name}
    >
      <Text style = {{ marginBottom: 10 }}>
        {restaurant.address}
      </Text>
    </Card>
  }

  renderAddFormStepByStep = () => {
    switch(this.props.step) {
      case 'amount needed':
        return (
          <View>
            <FormLabel>Amount</FormLabel>
            <FormInput 
              onChangeText = {(tip) => this.props.tipAmountChanged(tip)} 
              keyboardType = 'numeric'
              onEndEditing = {() => this.props.stepChanged('restaurant needed')}
            />
          </View>
        );
      case 'restaurant needed':
        return (
          <FlatList
            horizontal
            data = {this.props.usersRestaurants}
            renderItem = {({restaurant}) => {
              OS === 'ios' ?
              <TouchableOpacity
                onPress = {(restaurant) => {this.props.tipRestuarantChanged, this.props.stepChanged('date needed')}}>
                {this.renderRestaurantCard(restaurant)}
              </TouchableOpacity>
              :
              <TouchableNativeFeedback
                onPress = {(restaurant) => {this.props.tipRestuarantChanged, this.props.stepChanged('date needed')}}>
                {this.renderRestaurantCard(restaurant)}
              </TouchableNativeFeedback>
            }}
          />
        );
      case 'date needed':
        return (
          <View>
            {/*<Calendar 
              onDayPress = {(day) => this.props.tipDateChanged(day)}
            />*/}
            <Button onPress = {() => this.props.stepChanged('shift needed')} title = { 'Next' } />
          </View>
        );
      case 'shift needed':
        return (
          <View>
            <FormLabel>Place</FormLabel>
            <Picker
              selectedValue = { this.props.tipShift }
              onValueChange = {(shift) => this.props.tipShiftChanged(shift)}
            >
              <Picker.Item label = 'Breakfast' value = 'Breakfast' />
              <Picker.Item label = 'Brunch' value = 'Brunch' />
              <Picker.Item label = 'Lunch' value = 'Lunch' />
              <Picker.Item label = 'Happy Hour' value = 'Happy Hour' />
              <Picker.Item label = 'Dinner' value = 'Dinner' />
              <Picker.Item label = 'Late Night' value = 'Late night' />
            </Picker>
            <Button 
              onPress = {() => this.props.stepChanged('other needed')}
              title = { 'Next' } />
          </View>
        );
      case 'other needed':
        return (
          <View>
            <FormLabel>How was the shift?</FormLabel>
            <Text>{this.props.tipRating}</Text>
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={3.0}
              imageSize={40}
              onFinishRating={(rating) => this.props.tipRatingChanged(rating)}
              style={{ paddingVertical: 10 }}
            />
            <Divider />
            <FormLabel>Notes</FormLabel>
            <FormInput 
              onChangeText = {(text) => this.props.tipNotesChanged(text)} 
            />
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
      <View style = {{ flex: 1, justifyContent: 'center'}} >
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
    usersRestaurants
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
    usersRestaurants
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