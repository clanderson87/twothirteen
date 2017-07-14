import React, { Component } from 'react';
import { View, Text, Picker, ScrollView } from 'react-native';
import { Button, List, FormInput, FormLabel, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { slideTextStyle, slideSubTextStyle, buttonStyle, fullCentered, slideStyle } from '../styles';
import { setBudgetStep, getCatagories, affectBudgetItem, uploadBudgetItem, showPicker } from '../actions';
import SlidesWithInput from '../components/SlidesWithInput';


class AddBudgetScreen extends Component {
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

  renderSlides() {
    return this.props.budgetCatagories.map((slide, index) => {
      return (
      <View 
        key = { index }
        style = {[fullCentered, slideStyle]} >
        <FormLabel>{slide.title}</FormLabel>
        <FormInput onChangeText = { (text) => this.props.affectBudgetItem('name', text, this.props.budgetItem) } placeholder = 'Bill Name'/>
        <FormLabel>Amount</FormLabel>
        <FormInput onChangeText = { (text) => this.props.affectBudgetItem('amount', text, this.props.budgetItem) } placeholder = '$500' keyboard = 'numeric'/>
        <FormLabel>Frequency</FormLabel>
        <Picker style = {{ width: 300 }} onValueChange = { (freq) => {this.props.affectBudgetItem('freq', freq, this.props.budgetItem), console.log(this.props.budgetItem.freq)}}>
          <Picker.Item label = 'Daily' value = 'daily' />
          <Picker.Item label = 'Weekly' value = 'weekly' />
          <Picker.Item label = 'Biweekly' value = 'biweekly' />
          <Picker.Item label = 'Monthly' value = 'monthly' />
          <Picker.Item label = 'Bimonthly' value = 'bimonthly' />
          <Picker.Item label = 'Every 3 months' value = '3months' />
          <Picker.Item label = 'Every 6 months' value = '6months' />
          <Picker.Item label = 'Yearly' value = 'yearly' />
        </Picker>
        <Button onPress = { () => this.props.showPicker(true) } title = 'Pick Due Date' />
        { Object.keys(this.props.budgetItem) === ['amount', 'date', 'freq', 'name'] ? <Button onPress = { () => this.props.uploadBudgetItem(this.props.budgetItem)} title = 'Next' /> : null }
      </View>
      )
    });
  };

  render() {
    switch(this.props.budgetStep){
      case 'start budget':
      return (
        <ScrollView
          horizontal
          pagingEnabled
          style={{flex: 1 }}>
          {this.renderSlides()}
          <DateTimePicker
            isVisible = { this.props.picker }
            onConfirm = { (date) => { this.props.affectBudgetItem('date', date, this.props.budgetItem), this.props.showPicker(false) }}
            onCancel = { () => this.props.showPicker(false) }
            mode = 'date'
            titleIOS = 'Pick a Due Date'
            cancelTextIOS = 'Go back'
            is24Hour = { false }
          />
        </ScrollView>
      )
    }

    if(this.props.budgetId){
      return this.renderSlides();
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
