import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './navigation';


import AccueilScreen from './components/Accueil.js';
import IMCScreen from './components/CalculIMC.js';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

export default function App() {
	
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}


