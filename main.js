import Expo, { Notifications } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import firebase from 'firebase';
import store from './src/store';
import OnInitialLoadOrSignoutNavigator from './src/navigators/OnInitialLoadOrSignoutNavigator';
import registerForPushNotifications from './src/services/push_notifications';
import FIREBASE_SECRET from './src/secrets/FIREBASE_SECRETS';


class App extends React.Component {
  async componentDidMount() {
    firebase.initializeApp(FIREBASE_SECRET);

    await registerForPushNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text){
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'ok' }]
        );
      }
    });
  }

  render() {
    return (
      <Provider store = { store }>
        <View style={styles.container}>
          <OnInitialLoadOrSignoutNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);