// App.js
import React from 'react';
import { View, Text, StyleSheet,SafeAreaView } from 'react-native';
import ToDoScreen from './android/app/src/ToDoScreen';

export default function App()  {
  return (
    <SafeAreaView>
    <View>
      <ToDoScreen/>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});


