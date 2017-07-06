import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, List, FormInput, FormLabel, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { slideTextStyle, slideSubTextStyle, buttonStyle, fullCentered } from '../styles';
import { setBudgetStep, getCatagories } from '../actions';
import SlidesWithInput from '../components/SlidesWithInput';


class AddBudgetScreen extends Component {
  componentWillMount(){

  }
  
  renderBudgetModal = () => {
    this.props.getCatagories();
    return (
      <View style = {fullCentered} >
        <Text style = { slideTextStyle }>Set up your budget</Text>
        <Text style = { slideSubTextStyle }>Let's figure out how many bottles you need to sell</Text>
        <Button
          style = {buttonStyle}
          onPress = {() => this.props.setBudgetStep('start budget')}
          title = { 'Let\'s go!' } />
        <Button
          style = {buttonStyle}
          onPress = {() => this.props.navigation.navigate('Dashboard')}
          title = { 'Not yet' }
        />
      </View>
    )
  }

  showDatePicker = () => {
    return (
      <DateTimePicker
        mode = 'date'
        onConfirm = {(date) => {this.props.setBudgetKeyValue('date', date)}} 
        onCancel = {() => {}} />
    )
  }

  //TODO: THIS WILL WORK MUCH BETTER WITH A SWIPE DECK TO MODIFY MULTIPLE PROPERTIES!!!

  renderSlideInputs = item => {
    return (
      <View>
        <FormLabel>{item.name}</FormLabel>
        <FormInput
          keyboard = 'numeric'
          onEndEditing = {(val) => this.props.setBudgetKeyValue(item.name, val)}
          placeholder = 'monthly amount due' />
        <FormLabel>Importance</FormLabel>
        <Rating
          type = 'bell'
          ratingColor = 'red'
          ratingCount = {3}
          imageSize = {50}
          onFinishRating = {(rating) => this.props.setBudgetKeyValue('rating', rating)} />
        <Button
          onPress = {() => this.showDatePicker()}
          title = { 'Set Due Date' } />
      </View>
    )
  }

  renderBudgetSlides = () => {
    switch(this.props.budgetStep){
      case 'edit budget':
        let names = Object.keys(this.props.budgetObject);
        return (
          <List>
            {
              this.props.budgetObject.map((b, i) =>
                <ListItem
                  key = {i}
                  title = {names[i]}
                  onPress = {() => this.props.setBudgetStep('specific', names[i])}
                  hideCheveron
                />
              )
            }
          </List>
        );
      case 'start budget':
        return (
          <SlidesWithInput
            data = {this.props.budgetCatagories}
            input = {(item) => { return renderSlideInputs(item)}}
            />
        )
    }

  }

  render() {
    if(this.props.budgetId){
      this.props.setBudgetStep('edit budget');
      return this.renderBudgetSlides();
    } else {
      return (
        <View style = {fullCentered}>
          {this.renderBudgetModal()}
        </View>
      )
    }    
  }
  
  componentDidMount = () => {

  }
}

const mapStateToProps = ({budget}) => {
  const { budgetStep } = budget;
  return { budgetStep };
}

export default connect(mapStateToProps, {
  setBudgetStep,
  getCatagories
})(AddBudgetScreen);
