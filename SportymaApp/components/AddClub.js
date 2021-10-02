import React, {useState} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import styles from '../styles/styles.js';
import myQuickSort from './sortFunction.js';

const AddClub = () => {
	
	//On connecte une variable au state de Redux afin de pouvoir récupérer les clubs
	const reduxClubs = useSelector((state) => state.clubs);
	
	const [state, setState] = useState({
		clubs: reduxClubs,
		id: 0,
		name: "",
		logo: "",
		country: "",
		flagGenerate: false,
		flagError: false,
		errorLogo: false,
		errorName: false,
		errorCountry: false
	});
	
	//On crée la fonction pour retourner en arrière au clic sur la flèche de retour
	const navigation = useNavigation();
	const goBack = () => {
	
		navigation.goBack();
		
	}
	
	//On va créer la fonction permettant de déclencher l'action addClub
	const dispatch = useDispatch();
	
	const addClub = (newClub) => {
	
		dispatch(actions.addClub(newClub)); //Ajoute le club aux données brutes
		dispatch(actions.updateClubs()); 	//Met à jour les clubs
		
	}
	
	//On crée aussi la fonction qui demande à Redux de regénerer les relations
	const resetRelationships = () => {
			
		dispatch(actions.resetRelationships());
		
	}
	
	//On crée la fonction permettant la vérification des données avant ajout du club
	const verifyInput = () => {
	
		//On prépare une constante regex pour tester le lien de logo
		const regex = /(https?:\/\/.*\.(?:png|jpg))/i;
		
		//On va vérifier si les données ont toutes été rentrées
		if (
			state.name.length > 0 &&
			regex.test(state.logo) &&
			state.country.length > 0
		){
			
			setState(prevState => ({...prevState, flagError: false}));
			const newClub = {
				
				id: state.clubs.length +1,
				name: state.name,
				country: state.country,
				logo: state.logo
				
			}
			
			//On ajoute le club en appelant la fonction addClub
			addClub(newClub);
			
			//Si la génération de nouvelles relations a été demandée, on appelle
			//l'action Redux correspondante
			if (state.flagGenerate){ resetRelationships() } ;
			
			//Enfin, on renvoie l'utilisateur à l'accueil
			navigation.navigate('Accueil');
			
		}
		
		else {
			
			//On réinitialise les erreurs
			setState(prevState => ({...prevState, errorName: false}));
			setState(prevState => ({...prevState, errorLogo: false}));
			setState(prevState => ({...prevState, errorCountry: false}));
			
			//On teste chaque erreur possible, pour mettre en évidence
			//à l'utilisateur les champs qui requierent son attention
			if (state.name.length == 0) {
				
				setState(prevState => ({...prevState, errorName: true}));
				
			}
			
			if (!regex.test(state.logo)) {
				
				setState(prevState => ({...prevState, errorLogo: true}));
				
			}
			
			if (state.country.length == 0) {
				
				setState(prevState => ({...prevState, errorCountry: true}));
				
			}
				
			setState(prevState => ({...prevState, flagError: true}));
			
		}
		
	}
	
	//On crée chaque fonction de modification du state lorsqu'un champ du formulaire
	//est modifié.
	const changeName = (name) => {
		
		setState(prevState => ({...prevState, name: name}));
		
	}
	
	const changeURL = (url) => {
		
		setState(prevState => ({...prevState, logo: url}));
		
	}
	const changeCountry = (country) => {
		
		setState(prevState => ({...prevState, country: country}));
		
	}
	
	const flagGeneration = () => {
		
		setState(prevState => ({...prevState, flagGenerate: !state.flagGenerate}));
	}
	
	//On definit l'affichage du formulaire d'ajout de club
	return(
		<View style = {styles.coreView}>
			<View style = {styles.headerArrow}>
				<TouchableOpacity style = {styles.backArrow} onPress = {() => goBack()} >
					<Image 
						source = {require('../assets/images/backArrow.png')}
						style = {styles.backArrowIcon}
					/>
				</TouchableOpacity>
				<Text style = {styles.tabTitleArrow}>Ajouter un club</Text>
			</View>
			
			<View style={styles.form}>
			
				{/*Champ du nom de club*/}
				<View style = {styles.formField}>
					<Text style = {styles.label}>
						Nom du club
					</Text>
					<View style = {state.errorName ? [styles.formInput, styles.inputError] : styles.formInput}>
						<TextInput
							style={styles.input} 
							onChangeText={(TextInput) => changeName(TextInput)} 
							placeholder="Entrez un nom de club" 
						/>
					</View>
				</View>
				
				{/*Champ de l'URL du logo*/}
				<View style = {styles.formField}>
					<Text style = {styles.label}>
						Logo
					</Text>
					<View style = {state.errorLogo ? [styles.formInput, styles.inputError] : styles.formInput}>
						<TextInput
							style={styles.input} 
							onChangeText={(TextInput) => changeURL(TextInput)} 
							placeholder="Entrez le lien vers le logo" 
						/>
					</View>
				</View>
				
				{/*Champ du Pays*/}
				<View style = {styles.formField}>
					<Text style = {styles.label}>
						Pays
					</Text>
					<View style = {state.errorCountry ? [styles.formInput, styles.inputError] : styles.formInput}>
						<TextInput
							style={styles.input} 
							onChangeText={(TextInput) => changeCountry(TextInput)} 
							placeholder="Entrez le pays du club" 
						/>
					</View>
				</View>
				
				{/*Champ de la checkbox*/}
				<View style = {styles.formField}>
					<Text style = {styles.labelCheckbox}>
						Générer de nouvelles données de relation
					</Text>
					<View style = {styles.checkbox}>
						<Checkbox 
							onPress={() => flagGeneration()} 
							status={state.flagGenerate ? 'checked' : 'unchecked'}
						/>
					</View>
				</View>
				
				{/*Bouton de validation*/}
				<TouchableOpacity 
					style = {styles.addButton} 
					onPress={() => verifyInput()}
				>
					<Text style = {styles.addClub}>
						Valider
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
	
}

export default AddClub;