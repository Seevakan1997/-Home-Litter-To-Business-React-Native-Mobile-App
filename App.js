import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/global/Styles';
import SignInScreen from './src/screens/authScreens/SignInScreen';
import RootNavigator from './src/navigation/RootNavigator';
import MapScreen from './src/screens/MapScreen';



export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.statusbar}
      />
      <RootNavigator/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
