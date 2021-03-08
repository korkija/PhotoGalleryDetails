import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListPhotosScreen} from './Screens/ListPhotosScreen';
import {DetailsPhotoScreen} from './Screens/DetailsPhotoScreen';
const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{cardStyle: {backgroundColor: 'transparent'}}}>
      <RootStack.Screen
        name="Main"
        component={ListPhotosScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ModalGalleryScreen"
        component={DetailsPhotoScreen}
        options={{
          headerTitle: null,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
        }}
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
