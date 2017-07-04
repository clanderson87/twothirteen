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
import { Calendar } from 'react-native-calendars';
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

  returnMarkedDates = () => {
    if(this.props.tipDate.dateString){
      let marked = {}
      marked[this.props.tipDate.dateString] = { selected : true }
      console.log(marked);
      return marked;
    }
    else {
      return {};
    }
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
          <View>
            <FlatList
              horizontal
              data = {this.props.usersRestaurants}
              keyExtractor = { item => item.gId }
              renderItem = {({item}) => {
                console.log('in flatlist, item is:', item);
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
          <Grid style = {{ flex: 1 }}>
            <Row size = {1} />
            <Row size = {3}>
              <Calendar 
                hideExtraDays
                onDayPress = {(day) => this.props.tipDateChanged(day)}
                firstDay = {1}
                markedDates = {this.returnMarkedDates()}
                style={{
                  height: 350,
                  flex: 7
                }}
                theme = {{
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#dddddd',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#abcdef',
                  arrowColor: 'orange',
                  monthTextColor: 'blue'
                }}
              />
            </Row>
            <Row size = {1}>
              {this.props.tipDate.dateString ? 
                <Button 
                onPress = {() => this.props.stepChanged('shift needed')} 
                title = { 'Next' } 
                />
              : null }
            </Row> 
          </Grid>
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
      <View style = {{ flex: 1, justifyContent: 'center' }} >
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