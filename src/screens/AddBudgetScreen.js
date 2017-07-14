import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { Button, FormInput, FormLabel, Card, SwipeDeck } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { slideTextStyle, slideSubTextStyle, buttonStyle, fullCentered, slideStyle } from '../styles';
import { setBudgetStep, getCatagories, affectBudgetItem, uploadBudgetItem, showPicker } from '../actions';
import SlidesWithInput from '../components/SlidesWithInput';


class AddBudgetScreen extends Component {
  state = {freq: 'monthly'};

  componentWillMount(){

  }
  
  renderAddBudgetItemButton = () => {

  }

  renderBudgetModal = () => {
    if(!this.props.budgetCatagories){
      this.props.getCatagories();
    }
    return (
      <View style = {fullCentered} >
        <Text style = { slideTextStyle }>Set up your budget</Text>
        <Text style = { slideSubTextStyle }>Let's figure out how many bottles you need to sell</Text>
        <Button
          style = { buttonStyle }
          onPress = {() => this.props.setBudgetStep('start budget')}
          title = { 'Let\'s go!' } />
        <Button
          style = {  buttonStyle}
          onPress = {() => this.props.navigation.navigate('Dashboard')}
          title = { 'Not yet' }
        />
      </View>
    )
  }

  onSwipeRight = () => {
    this.props.uploadBudgetItem(this.props.budgetItem);
  }

  renderCard = card => {
    return (
      <Card>
        <FormLabel>{ card.title }</FormLabel>
        <FormInput onChangeText = { (text) => this.props.affectBudgetItem('name', text, this.props.budgetItem) } placeholder = 'Bill Name'/>
        <FormLabel>Amount</FormLabel>
        <FormInput onChangeText = { (text) => this.props.affectBudgetItem('amount', text, this.props.budgetItem) } placeholder = '$500' keyboard = 'numeric'/>
        <FormLabel>How often is it due?</FormLabel>
        <Picker style = {{ width: 300 }} onValueChange = { (freq) => {this.props.affectBudgetItem('freq', freq, this.props.budgetItem), this.setState({freq})}} selectedValue = {this.state.freq}>
          <Picker.Item id = {0} label = 'Daily' value = 'daily' />
          <Picker.Item id = {1} label = 'Weekly' value = 'weekly' />
          <Picker.Item id = {2} label = 'Biweekly' value = 'biweekly' />
          <Picker.Item id = {3} label = 'Monthly' value = 'monthly' />
          <Picker.Item id = {4} label = 'Bimonthly' value = 'bimonthly' />
          <Picker.Item id = {5} label = 'Every 3 months' value = '3months' />
          <Picker.Item id = {6} label = 'Every 6 months' value = '6months' />
          <Picker.Item id = {7} label = 'Yearly' value = 'yearly' />
        </Picker>
        <Button onPress = { () => this.props.showPicker(true) } title = 'Pick Due Date' />
      </Card>
      )
    };

  render() {
    switch(this.props.budgetStep){
      case 'start budget':
      return (
        <View>
          <SwipeDeck
            style = {{flex: 1 }}
            data = {this.props.budgetCatagories}
            renderCard = {this.renderCard}
            onSwipeRight={this.onSwipeRight}>
          </SwipeDeck>
          <DateTimePicker
            isVisible = { this.props.picker }
            onConfirm = { (date) => { this.props.affectBudgetItem('date', date, this.props.budgetItem), this.props.showPicker(false) }}
            onCancel = { () => this.props.showPicker(false) }
            mode = 'date'
            titleIOS = 'Pick a Due Date'
            cancelTextIOS = 'Go back'
            is24Hour = { false }
          />
        </View>
      )
    };

    if(!this.props.budgetId){
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

const mapStateToProps = ({ budget, dashboard}) => {
  const { budgetStep, budgetCatagories, budgetItem, picker } = budget;
  const budgetId = dashboard.budget;
  return { budgetStep, budgetCatagories, budgetItem, budgetId, picker };
}

export default connect(mapStateToProps, {
  setBudgetStep,
  getCatagories,
  affectBudgetItem,
  uploadBudgetItem,
  showPicker
})(AddBudgetScreen);
