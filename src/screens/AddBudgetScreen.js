import React, { Component } from 'react';
import { View, Text, Picker, Alert } from 'react-native';
import { Button, FormInput, FormLabel, Card, SwipeDeck } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FadeInView from 'react-native-fade-in-view';
import { slideTextStyle, slideSubTextStyle, buttonStyle, fullCentered, slideStyle } from '../styles';
import { setBudgetStep, getCatagories, affectBudgetItem, uploadBudgetItem, showPicker, addMoreMiscCards, disableUIAlert } from '../actions';
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
        { this.props.budgetCatagories 
          ? 
          <FadeInView
            duration={400}>
            <Button
              style = { buttonStyle }
              onPress = {() => this.props.setBudgetStep('start budget')}
              title = { 'Let\'s go!' } />
            <Button
              style = { buttonStyle}
              onPress = {() => this.props.navigation.navigate('Dashboard')}
              title = { 'Not yet' }
            />
          </FadeInView>
        :
        null}
      </View>
    )
  }

  onSwipeRight = card => {
    this.props.uploadBudgetItem(this.props.budgetItem, card.title);
  }

  onSwipeLeft = card => {
    if(card.misc){
      return;
    };
    this.props.uploadBudgetItem(this.props.budgetItem, card.title, 'VOID');
  }


  backToDashboard = () => {
    Alert.alert( 'Remember...', 'You can always adjust your budget in the settings',
    [ {text: 'Ok', onPress: () => this.props.navigation.navigate('Dashboard')}]);
  }

  renderNoMoreCards = () => {
    return(
      <View>
        <FadeInView>
          <Text style = { slideTextStyle }>All done!</Text>
          <Text style = { slideSubTextStyle }>Anything else you need to add?</Text>
          <FadeInView
            duration = {250}>
            <Button style = { buttonStyle } onPress = { () => this.backToDashboard() } title = { 'Nope, all set!' } />
            <Button style = { buttonStyle } onPress = { () => this.props.addMoreMiscCards() } title = { 'Just a few more...'} />
          </FadeInView>
        </FadeInView>
      </View>
    )
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
      </Card>
      )
    };

  render() {
    switch(this.props.budgetStep){
      case 'start budget':
      return (
        <View>
          <SwipeDeck
            style = {{ flex: 1 }}
            data = { this.props.budgetCatagories }
            renderCard = { this.renderCard }
            onSwipeRight = { this.onSwipeRight }
            onSwipeLeft =  { this.onSwipeLeft }
            renderNoMoreCards = { this.renderNoMoreCards }>
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
          { this.props.uiAlert ? Alert.alert( 'Info:', 'Swipe right to save an item to your budget. \nSwipe left to ignore it!',
          [ {text: 'Ok', onPress: () => {this.props.disableUIAlert()}}]) : null }
        </View>
      )
    };

    if(this.props.budgetId === 'budget needed'){
      return (
        <View style = { fullCentered }>
          { this.renderBudgetModal() }
        </View>
      )
    } else {
      return (
        <View><Text>This happened</Text></View>
      )
    }
  }
  
  componentDidMount = () => {

  }
}

const mapStateToProps = ({ budget, dashboard}) => {
  const { budgetStep, budgetCatagories, budgetItem, picker, uiAlert } = budget;
  const budgetId = dashboard.budget;
  return { budgetStep, budgetCatagories, budgetItem, budgetId, picker, uiAlert };
}

export default connect(mapStateToProps, {
  setBudgetStep,
  getCatagories,
  affectBudgetItem,
  uploadBudgetItem,
  addMoreMiscCards,
  disableUIAlert,
  showPicker
})(AddBudgetScreen);
