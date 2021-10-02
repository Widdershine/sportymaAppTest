/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Accueil from '../components/Accueil.js';
import Club from '../components/Club.js';
import AddClub from '../components/AddClub.js';
import Player from '../components/Player.js';

import { RootStackParamList } from '../types';

import { Provider } from 'react-redux';
import store from '../store';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
	<Provider store={store}>
		<Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#1b3257' } }} initialRouteName="Accueil">
			<Stack.Screen name="Accueil" component={Accueil} />
			<Stack.Screen name="Club" component={Club} />
			<Stack.Screen name="addClub" component={AddClub} />
			<Stack.Screen name="Player" component={Player} />
		</Stack.Navigator>
	</Provider>
  );
}
