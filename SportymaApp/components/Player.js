import React, {useState} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { actions } from '../store';
import styles from '../styles/styles.js';
import myQuickSort from './sortFunction.js';

const Player = () => {
	
	//On connecte une variable au state de Redux afin de pouvoir récupérer les clubs,
	//une autre pour les joueurs et une dernière pour les relationships
	const reduxClubs = useSelector((state) => state.clubs);
	const reduxRelationships = useSelector((state) => state.relationships);
	const reduxPlayers = useSelector((state) => state.players);
	
	const [state, setState] = useState({
		clubs: reduxClubs,
		players: reduxPlayers
	});
	
	//On crée une fonction permettant de retrouver le nom d'un club dans la liste
	//via son id.
	const findClubName = (clubId) => {
		
		var clubName = "";
		var i = 0;
		
		while (i < state.clubs.length && clubName == ""){
		
			if (state.clubs[i].id == clubId){
					
				clubName = state.clubs[i].name;
				
			}
			
			else {
				
				i++;
				
			}
			
		}
		
		return clubName;
		
	}
	
	//On récupère les paramètres du joueur choisi dans la navigation
	const playerId = useRoute().params.playerId;
	
	//On crée la navigation pour retourner en arrière au clic sur la flèche de retour
	const navigation = useNavigation();
	const goBack = () => {
	
		navigation.goBack();
		
	}
	
	//On va maintenant chercher le joueur dans la liste du state
	var i = 0;
	var flagPlayer = false;
	var displayedPlayer = null;
	while (i < state.players.length && flagPlayer == false){
		
		if (state.players[i].id == playerId){
			
			//S'il s'agit du bon club, on valide le booléen et on
			//enregistre celui-ci dans la variable displayedPlayer
			flagPlayer = true;
			displayedPlayer = state.players[i];
			
		}
		
		else {
			
			i++;
			
		}
		
	}
	
	//Si on a bien retrouvé le joueur dans la liste, on affiche alors ses informations, ainsi
	//que l'ensemble des clubs dans lesquels il a joué, affichés par saison avec les statistiques.
	//Sinon, on affiche un message d'erreur avec un bouton retour
	if (flagPlayer){
		
		//On ajoute au state les relationships qui concernent ce joueur pour la saison en cours
		//La saison en cours sera une donnée statique définie comme celle de 2021/2022. Il aurait
		//été plus correct de définir les saisons via des ids, et de stocker les dates 
		//correspondantes dans un autre tableau de données, mais cela n'était pas demandé pour
		//cet exercice.)
		var relationships = [];
		var seasons = [];
		
		//On boucle sur reduxRelationships
		for (var i = 0; i < reduxRelationships.length; i++){
			
			//On verifie si la relation correspond bien à notre joueur
			if (reduxRelationships[i].player == displayedPlayer.id){
				
				relationships.push(reduxRelationships[i]);
				
				//En vue de trier les relations par saison ultérieurement, on
				//en profite pour extraire chacune de ces valeurs
				seasons.push(reduxRelationships[i].season);
				
			}
			
		}
		
		//On trie relationships pour un affichage des joueurs du club en fonction de leur numéro.
		//Pour cela, on utilise ma fonction myQuickSort, qui renvoie un array 2D avec dans une ligne
		//les données triées et dans l'autre les positions d'origine
		const seasonIndexes = myQuickSort(seasons, -1);
		
		//Enfin on boucle sur seasonIndexes pour réorganiser relationships
		var sortedRelationships = [];
		for (var i = 0; i < seasons.length; i++){
		
			sortedRelationships.push(relationships[seasonIndexes[1][i]-1]);
			
		}
		
		var currentSeason = 0;
		
		//On definit l'affichage pour chaque club et chaque saison
		const renderClubs = ({item}) => {
			
			let tempName = findClubName(item.club);
			
			//Si on affiche le premier club auquel le joueur appartient pour
			//la saison concernée, alors on ouvre une view affichant un titre
			//pour cette saison
			if (item.season != currentSeason){
				
				currentSeason = item.season;
				
				return (
					
					<React.Fragment>
						<View style={styles.seasonWrapper}>
							<View style = {styles.borders}>
							</View>
							<View style = {styles.seasonDisplay}>
								<Text style = {styles.seasonTitle}>
									{item.season} / {item.season + 1}
								</Text>
							</View>
						</View>
						
						<View style={[styles.jumbotron, styles.rounded]} >
							<View style = {[styles.panel, styles.leftPanel]}>
								<Text style = {styles.clubName}>
									{tempName}
								</Text>
								<Text style = {styles.clubNumber}>
									{item.number}
								</Text>
							</View>
							<View style = {styles.panel}>
								<Text style = {styles.stats}>
									Nombre de match: {item.nbMatchs}
								</Text>
								<Text style = {styles.stats}>
									Buts marqués: {item.nbButs}
								</Text>
							</View>
						</View>
					</React.Fragment>
					
				)
			
			}
				
			else {	
			//On continue dans la saison précédente
			
				return (
				
					<View style={[styles.jumbotron, styles.rounded]} >
						<View style = {[styles.panel, styles.leftPanel]}>
							<Text style = {styles.clubName}>
								{tempName}
							</Text>
							<Text style = {styles.clubNumber}>
								{item.number}
							</Text>
						</View>
						<View style = {styles.panel}>
							<Text style = {styles.stats}>
								Nombre de match: {item.nbMatchs}
							</Text>
							<Text style = {styles.stats}>
								Buts marqués: {item.nbButs}
							</Text>
						</View>
					</View>
					
				)
				
			}
			
		}
		
		//Enfin on affiche l'interface principale avec la flatlist
		return(
			<View style = {styles.coreView}>
				<View style = {styles.headerArrow}>
					<TouchableOpacity style = {styles.backArrow} onPress = {() => goBack()} >
						<Image 
							source = {require('../assets/images/backArrow.png')}
							style = {styles.backArrowIcon}
						/>
					</TouchableOpacity>
					<Text style = {styles.tabTitleArrow}>{displayedPlayer.fName}</Text>
				</View>
				<View style = {styles.clubDetails}>
					<Text style = {styles.seasonText}>
						{displayedPlayer.lName}
					</Text>
					<Text style = {styles.clubDetailText}>
						{displayedPlayer.fName}
					</Text>
				</View>
				<View style={styles.container}>
					<FlatList 
						data={sortedRelationships} 
						keyExtractor={(item, index) => item.id.toString()} 
						renderItem={renderClubs}
					/>
				</View>
			</View>
		);
		
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
						Il y a eu une erreur dans la sélection du joueur. Mais comment avez vous fait?
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

export default Player;