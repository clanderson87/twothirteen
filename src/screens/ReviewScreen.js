import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { CLEAR, IOS_BLUE } from '../colors';
import { addItemToUser } from '../actions/firebase_helpers';

class ReviewScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Review',
    headerRight: (
      <Button title='Settings' 
        onPress={() => navigation.navigate('settings')}
        backgroundColor={CLEAR}
        color={IOS_BLUE}
        style={{marginTop: Platform.OS === 'android' ? 24 : 0 }}
      />
    )
  })

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Button onPress = {() => addItemToUser('Hello', 'words')} title = {'upload'} />
      </View>
    );
  }
}

export default ReviewScreen;