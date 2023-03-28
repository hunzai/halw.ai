import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Prompter from './src/components/Prompter';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Prompter/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f002',
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
  },
});
