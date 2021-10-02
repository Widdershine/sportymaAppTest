import React, {useState} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import styles from '../styles/styles.js';
import myQuickSort from './sortFunction.js';

const Club = () => {
	
	//On connecte une variable au state de Redux afin de pouvoir récupérer les clubs,
	//une autre pour les joueurs et une dernière pour les relationships
	const reduxClubs = useSelector((state) => state.clubs);
	const reduxRelationships = useSelector((state) => state.relationships);
	const reduxPlayers = useSelector((state) => state.players);
	
	const [state, setState] = useState({
		clubs: reduxClubs,
		players: reduxPlayers
	});
	
	//On crée une fonction permettant de retrouver le nom d'un joueur dans la liste
	//via son id.
	const findPlayerName = (playerId) => {
		
		var playerName = "";
		var i = 0;
		
		while (i < reduxPlayers.length && playerName == ""){
		
			if (reduxPlayers[i].id == playerId){
					
				playerName = reduxPlayers[i].lName + " " + reduxPlayers[i].fName;
				
			}
			
			else {
				
				i++;
				
			}
			
		}
		
		return playerName;
		
	}
	
	//On récupère les paramètres du club choisi dans la navigation
	const clubId = useRoute().params.clubId;
	
	//On crée la fonction de navigation vers un joueur sélectionné
	const navigation = useNavigation();
	
	const goToPlayer = (playerId) => {
	
		navigation.navigate('Player', { playerId:  playerId});
		
	}
	
	//Puis celle pour retourner en arrière au clic sur la flèche de retour
	const goBack = () => {
	
		navigation.goBack();
		
	}
	
	//On va maintenant chercher le club dans la liste du state
	var i = 0;
	var flagClub = false;
	var displayedClub = null;
	while (i < reduxClubs.length && flagClub == false){
		
		if (reduxClubs[i].id == clubId){
			
			//S'il s'agit du bon club, on valide le booléen et on
			//enregistre celui-ci dans la variable displayedClub
			flagClub = true;
			displayedClub = reduxClubs[i];
			
		}
		
		else {
			
			i++;
			
		}
		
	}
	
	//Si on a bien retrouvé le club dans la liste, on affiche alors ses informations, ainsi
	//que l'ensemble de ses joueurs pour la saison dans un flatlist.
	//Sinon, on affiche un message d'erreur avec un bouton retour
	if (flagClub){
		
		//On va maintenant vérifier qu'il y a des joueurs dans ce club. Si c'est le cas,
		//on les affichera, sinon, on prévient qu'il n'y en a pas.
		//On ajoute au state les relationships qui concernent ce club pour la saison en cours
		//La saison en cours sera une donnée statique définie comme celle de 2021/2022. Il aurait
		//été plus correct de définir les saisons via des ids, et de stocker les dates 
		//correspondantes dans un autre tableau de données, mais cela n'était pas demandé pour
		//cet exercice.
		var thisSeason = 2021;
		var relationships = [];
		var playersNumber = [];
		
		//On boucle sur reduxRelationships
		for (var i = 0; i < reduxRelationships.length; i++){
			
			//On verifie si la relation correspond bien à notre club, ainsi qu'à la saison
			//courante
			if (reduxRelationships[i].club == displayedClub.id && reduxRelationships[i].season == thisSeason){
				
				relationships.push(reduxRelationships[i]);
				
				//En vue de trier les relations par numéro de joueur ultérieurement, on
				//en profite pour extraire chaque numéro conservé
				playersNumber.push(reduxRelationships[i].number);
				
			}
			
		}
		
		//On vérifie maintenant le nombre de joueurs
		if (playersNumber.length > 0){
			
			//On trie relationships pour un affichage des joueurs du club en fonction de leur numéro.
			//Pour cela, on utilise ma fonction myQuickSort, qui renvoie un array 2D avec dans une ligne
			//les données triées et dans l'autre les positions d'origine
			const numberIndexes = myQuickSort(playersNumber, 1);
			
			//Enfin on boucle sur numberIndexes pour réorganiser relationships
			var sortedRelationships = [];
			for (var i = 0; i < playersNumber.length; i++){
			
				sortedRelationships.push(relationships[numberIndexes[1][i]-1]);
				
			}
			
			//On definit l'affichage pour chaque joueur du club
			const renderPlayers = ({item}) => {
				
				let tempName = findPlayerName(item.player);
				
				return (
					<TouchableOpacity  style={[styles.jumbotron, styles.stylized]} onPress={() => goToPlayer(item.player)} >
						<View style={styles.clubLogo}>
						  <Text style={styles.playerNumber} >{item.number}</Text>
						</View>
						<View style={styles.coreDisplay}>
							<Text style={styles.playerName} >{tempName}</Text>
						</View>
					</TouchableOpacity>
				)
			}
			
			return(
				<View style = {styles.coreView}>
					<View style = {styles.headerArrow}>
						<TouchableOpacity style = {styles.backArrow} onPress = {() => goBack()} >
							<Image 
								source = {require('../assets/images/backArrow.png')}
								style = {styles.backArrowIcon}
							/>
						</TouchableOpacity>
						<Text style = {styles.tabTitleArrow}>{displayedClub.name}</Text>
					</View>
					<View style = {styles.clubDetails}>
						<Text style = {styles.seasonText}>
							Saison {thisSeason}/{thisSeason+1}
						</Text>
						<Text style = {styles.clubDetailText}>
							Pays: {displayedClub.country}
						</Text>
					</View>
					<View style={styles.container}>
						<FlatList 
							data={sortedRelationships} 
							keyExtractor={(item, index) => item.id.toString()} 
							renderItem={renderPlayers}
						/>
					</View>
				</View>
			);
			
		}
		
		else {
		//On se contente du message d'absence de joueurs	
		
			return(
				<View style = {styles.coreView}>
					<View style = {styles.headerArrow}>
						<TouchableOpacity style = {styles.backArrow} onPress = {() => goBack()} >
							<Image 
								source = {require('../assets/images/backArrow.png')}
								style = {styles.backArrowIcon}
							/>
						</TouchableOpacity>
						<Text style = {styles.tabTitleArrow}>{displayedClub.name}</Text>
					</View>
					<View style = {styles.clubDetails}>
						<Text style = {styles.seasonText}>
							Saison {thisSeason}/{thisSeason+1}
						</Text>
						<Text style = {styles.clubDetailText}>
							Pays: {displayedClub.country}
						</Text>
					</View>
					<View style={styles.container}>
						<View style = {styles.noClubs}>
							<Text>
								Aucun joueur dans ce club pour la saison.
							</Text>
						</View>
					</View>
				</View>
			);
			
		}
		
	}
	
	else{
		
		return(
			<View style = {styles.coreView}>
				<View style = {styles.headerArrow}>
					<TouchableOpacity style = {styles.backArrow} onPress = {() => goBack()} >
						<Image 
							source={require('../assets/images/backArrow.png')}
							style = {styles.backArrowIcon} 
						/>
					</TouchableOpacity>
					<Text style = {styles.tabTitle}>Club</Text>
				</View>
				<View style = {styles.clubDetails}>
					<Text style = {styles.clubDetailText}>
						Il y a eu une erreur dans la sélection du club. Mais comment avez vous fait?
					</Text>
				</View>
				<TouchableOpacity style={styles.backButton} onPress = {() => goBack()} >
					<Text style = {styles.buttonText}>
						Retour
					</Text>
				</TouchableOpacity>
			</View>
		);
		
	}
}

export default Club;