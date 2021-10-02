import React, {useState} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import styles from '../styles/styles.js';

const Accueil = () => {
	
	//On connecte une variable au state de Redux afin de pouvoir récupérer les données
	//ainsi que les possibles mises à jour des clubs
	const reduxClubs = useSelector((state) => state.clubs);
	
	const [state, setState] = useState({
		clubs: reduxClubs,
	});
	
	//On crée la fonction de navigation vers un club sélectionné
	const navigation = useNavigation();
	
	const goToClub = (clubId) => {
	
		navigation.navigate('Club', { clubId:  clubId});
		
	}
	
	//On crée la fonction qui permet le dispatch de l'action SEARCH_CLUB
	const dispatch = useDispatch();
	
	const searchClubs = (TextInput) => {
	
		dispatch(actions.searchClub(TextInput));
		
	}
	
	//On crée la fonction qui permet le renvoi sur la page d'ajout d'un club
	const goToAddClub = () => {
		
		navigation.navigate('addClub');
	
	}
	
	//On affiche tout dans un render avec une flatlist pour un scrolling sur les clubs	
	const renderClubs = ({item}) => {
		
		return (
			<TouchableOpacity  style={styles.jumbotron} onPress={() => goToClub(item.id)} >
				<View style={styles.clubLogo}>
				  <Image
					style={styles.tinyLogo}
					source={{uri: item.logo}}
				  />
				</View>
				<View style={styles.coreDisplay}>
					<Text style={styles.clubTitle} >{item.name}</Text>
				</View>
			</TouchableOpacity>
		)
	}
	
	//Si on a aucun club retourné, on affiche un message, sinon on affiche les clubs
	if (reduxClubs.length > 0){
		
		return (
		
			<View style = {styles.coreView}>
				<View style = {styles.header}>
					<Text style = {styles.tabTitle}>Accueil</Text>
				</View>
				
				<View style = {styles.inputView}>
					<View style = {styles.searchDiv}>
						<Image
							style={styles.searchLogo}
							source={require('../assets/images/search.png')}
						/>
					</View>
					<TextInput
						style={styles.input} 
						onChangeText={(TextInput) => searchClubs(TextInput)} 
						placeholder="Entrez un nom de club" 
					/>
				</View>
				
				<View style={styles.container}>
					<FlatList 
						data={reduxClubs} 
						keyExtractor={(item, index) => item.id.toString()} 
						renderItem={renderClubs}
					/>
					
					<TouchableOpacity 
						style = {styles.addButton} 
						onPress={() => goToAddClub()}
					>
						<Text style = {styles.addClub}>
							Ajouter un club
						</Text>
					</TouchableOpacity>
				</View>
				
			</View>
			
		)
	
	}
	
	else {
		
		return (
		
			<View style = {styles.coreView}>
				<View style = {styles.header}>
					<Text style = {styles.tabTitle}>Accueil</Text>
				</View>
				
				<View style = {styles.inputView}>
					<View style = {styles.searchDiv}>
						<Image
							style={styles.searchLogo}
							source={require('../assets/images/search.png')}
						/>
					</View>
					<TextInput
						style={styles.input} 
						onChangeText={(TextInput) => searchClubs(TextInput)} 
						placeholder="Entrez un nom de club" 
					/>
				</View>
				
				<View style={styles.container}>
					<View style = {styles.noClubs}>
						<Text>
							Aucun club trouvé.
						</Text>
					</View>
					
					<TouchableOpacity 
						style = {styles.addButton} 
						onPress={() => goToAddClub()}
					>
						<Text style = {styles.addClub}>
							Ajouter un club
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			
		)
		
	}
}

export default Accueil;