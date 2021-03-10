import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListPhotosScreen} from './Screens/ListPhotosScreen';
import {DetailsPhotoScreen} from './Screens/DetailsPhotoScreen';
const RootStack = createStackNavigator();

const optionsGalleryScreen = {
  headerTitle: null,
  headerStyle: {
    backgroundColor: '#000',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTintColor: '#fff',
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{cardStyle: {backgroundColor: 'black'}}}>
      <RootStack.Screen
        name="Main"
        component={ListPhotosScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="GalleryScreen"
        component={DetailsPhotoScreen}
        options={optionsGalleryScreen}
      />
    </RootStack.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
