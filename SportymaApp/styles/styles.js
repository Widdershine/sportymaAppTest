import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
	
	coreView: {
	
		marginTop: 25,
		flex: 1
		
	},
	
	header: {
		
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20
		
	},
	
	headerArrow: {
		
		backgroundColor: 'white',
		flexDirection: 'row'
		
	},
	
	tabTitle: {
		
		fontSize: 30,
		color: 'black',
		marginTop: 20,
		marginBottom: 20,
		fontWeight: 'bold'
		
	},
	
	tabTitleArrow: {
		
		fontSize: 30,
		color: 'black',
		marginTop: 20,
		marginBottom: 20,
		width: '80%',
		textAlign: 'center',
		fontWeight: 'bold'
		
	},
	
	inputView: {
	
		borderRadius: 15,
		borderColor: 'grey',
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		width: '75%',
		alignSelf: 'center',
		padding: 5,
		flexDirection: 'row'
		
		
	},
	
	form: {
		
		backgroundColor: 'rgba(200, 200, 200, 0.5)',
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 12,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		width: '90%',
		alignSelf: 'center'
		
	},
	
	formField: {
		
		flexDirection: 'row',
		width: '90%',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center'
		
	},
	
	label: {
	
		width: '40%',
		textAlign: 'right',
		paddingRight: 25,
		color: 'white'
		
	},
	
	labelCheckbox: {
	
		width: '90%',
		color: 'white'
	
	},
	
	checkbox: {
	
		width: '10%'
		
	},
	
	formInput: {
		
		borderRadius: 10,
		borderColor: 'grey',
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		width: '60%',
		padding: 5,
		flexDirection: 'row'
		
	},
	
	inputError: {
		
		borderColor: 'red',
		backgroundColor: '#fff0f0',
		color: 'red'
		
	},
	
	searchDiv: {
		
		width: '12%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
		
		
	},
	
	searchLogo: {
	
		width: 15,
		height: 15,
		resizeMode: 'contain'
		
	},
	
	jumbotron: {
		
		backgroundColor: 'white',
		color: 'black',
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 20,
		width: '80%',
		alignSelf: 'center',
		alignItems: 'center'
		
	},
	
	addButton: {
		
		backgroundColor: 'lightgrey',
		color: 'black',
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 20,
		borderRadius: 10,
		width: '50%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center'
		
	},
	
	noClubs: {
		
		backgroundColor: 'white',
		borderRadius: 5,
		color: 'black',
		alignSelf: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 20,
		width: '80%',
		alignSelf: 'center'
		
	},
	
	stylized: {
	
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10
		
	},
	
	container: {
		
		marginTop: 20,
		marginBottom: 10,
		flex: 1
	
	},
	
	clubLogo: {
	
		width: '30%',
		flexDirection: 'row',
		justifyContent: 'center'
		
	},
	
	tinyLogo: {
		
		width: 50,
		height: 50,
		resizeMode: 'contain'
		
	},
	
	backArrow: {
	
		width: '20%',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 20,
		borderColor: 'grey',
		borderRightWidth: 1
		
	},
	
	backArrowIcon: {
		
		width: 40,
		height: 40,
		resizeMode: 'contain'
		
	},
	
	clubTitle: {
		
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold'
		
		
	},
	
	clubDetails: {
		
		backgroundColor: 'lightgrey',
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
		padding: 10,
		paddingLeft: 20
		
	},
	
	seasonText: {
	
		fontSize: 20,
		fontWeight: 'bold'
		
	},
	
	playerNumber: {
		
		fontSize: 20,
		fontWeight: 'bold'
		
	},
	
	clubDetailText: {
	
		fontSize: 18,
		fontWeight: 'bold'
		
	},
	
	rounded: {
		
		borderRadius: 5
		
	},
	
	seasonWrapper: {
	
		height: 40,
		marginBottom: 5,
		marginTop: 5
		
		
	},
	
	borders: {
		
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: 'lightgrey',
		borderTopStartRadius: 15,
		borderTopEndRadius: 15,
		position: 'absolute',
		top: 10,
		left: '5%',
		width: '90%',
		height: 25
		
	},
	
	seasonDisplay: {
	
		borderWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 5,
		position: 'absolute',
		top: 0,
		width: 100,
		height: 28,
		left: 40,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
		
	},
	
	panel: {
		
		width: '50%',
		padding: 5,
		justifyContent: 'center'
		
	},
	
	leftPanel: {
		
		justifyContent: 'center',
		alignItems: 'center'
		
	},
	
	clubName: {
		
		fontWeight: 'bold',
		fontSize: 18
		
	},
	
	clubNumber: {
		
		fontWeight: 'bold',
		fontSize: 15
		
	},
	
	coreDisplay: {
		
		width: '70%',
		marginBottom: 20,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 15,
		justifyContent: 'center',
		alignItems: 'center'
		
	}
	
})

export default styles;