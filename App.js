import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/global/Styles';
import SignInScreen from './src/screens/authScreens/SignInScreen';
import RootNavigator from './src/navigation/RootNavigator';
import Locate from './src/components/location';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.statusbar}
      />
      <RootNavigator/>
      {/* <Locate/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
