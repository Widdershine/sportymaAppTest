import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//On importe un fichier de données afin d'avoir une première sélection
//de clubs et de joueurs
import testData from './data/footballData.js';

const initialState = {
	rawData: testData,
	players: testData.players,
	clubs: testData.clubs,
	relationships: []
}

//On va maintenant creer les relations entre clubs et joueurs. Pour cela,
//on va pour un nombre donné de saisons prendre un joueur aléatoire de la
//liste et le distribuer dans le club qui a le moins de joueurs à cette
//instance. On lui génère ensuite un nombre aléatoire de matchs et de 
//buts marqués, ainsi qu'un numéro de maillot incrémenté pour la saison.
const getRelationships = (clubs) => {
	//Cette fonction sera appelée à la création du state de Redux, ainsi
	//qu'à chaque appel de resetRelationships.

	const nbPlayers = initialState.players.length;
	const nbClubs = clubs.length;
	var relationships = [];
	var indexClub = 0;
	var thisYear = 2021;

	//On cree la fonction de randomize de la liste de joueurs
	function shuffle(array) {
		
	  var currentIndex = array.length, randomIndex;

	  //Tant qu'il reste des éléments à mélanger
	  while (currentIndex != 0) {

		//On prend un index au hasard
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		//Enfin on echange l'index pris au hasard avec l'index actuel
		[array[currentIndex], array[randomIndex]] = [
		  array[randomIndex], array[currentIndex]];
	  }

	  return array;
	}

	//On cree une fonction pour trouver la plus petite valeur d'un array
	function getMinOf(array) {
		
		let minIndex = 0;
		
		for (var i = 1; i < array.length; i++){
		
			if (array[i] < array[minIndex]){ 
			
				minIndex = i;
				
			}
			
		}
		
		return minIndex;
		
	}

	//On initialise l'incrément pour l'id des relations
	var increment = 0;

	//On boucle sur un total de 5 saisons, en commençant par celle de thisYear
	for (var season = 0; season <= 4; season++){
		
		//On cree un vecteur stockant le nombre de joueurs deja renseignes
		//dans chaque club pour cette saison
		let nbPlayerByClub = new Array(nbClubs).fill(0);
		
		//On cree un vecteur rendu aleatoire des joueurs
		let randomizedPlayers = shuffle(initialState.players);
		
		//Pour chaque saison, on va ajouter une relation entre un joueur et un club
		for (var i = 0; i < nbPlayers; i++) {
			
			let indexClub = getMinOf(nbPlayerByClub);
			let nbMatchs = Math.round(Math.random()*10);
			
			//On ajoute aux relations une nouvelle pour le joueur randomized
			relationships.push({
				
				id: increment,
				player: randomizedPlayers[i].id,
				club: indexClub+1,
				season: thisYear-season,
				number: nbPlayerByClub[indexClub]+1,
				nbMatchs: nbMatchs,
				nbButs: Math.round(Math.random()*2)*nbMatchs
				
			});
			
			increment++;
			
			//On augmente de un le nombre de joueur actuellement dans le club
			nbPlayerByClub[indexClub]++;
			
			//On joue a pile ou face pour ajouter un second club au joueur pour
			//cette saison.
			if (Math.round(Math.random()) == 1){
				
				let indexClub = getMinOf(nbPlayerByClub);
				let nbMatchs = Math.round(Math.random()*10);
				
				//On ajoute aux relations une nouvelle pour le joueur randomized
				relationships.push({
					
					id: increment,
					player: randomizedPlayers[i].id,
					club: indexClub+1,
					season: thisYear-season,
					number: nbPlayerByClub[indexClub]+1,
					nbMatchs: nbMatchs,
					nbButs: Math.round(Math.random()*2)*nbMatchs
					
				});
				
				increment++;
			
				//On augmente de un le nombre de joueur actuellement dans le club
				nbPlayerByClub[indexClub]++;
				
			}
			
		}
		
	}
	
	return relationships;
	
}

//On valide le state initial avec les données du JSON ainsi que celles générées
//de manière aléatoire.
initialState.relationships = getRelationships(initialState.clubs);

//Enfin, on crée la fonction searchClubs, permettant à l'action SEARCH_CLUB de
//modifier la liste des clubs dans le state
function searchClubs(club){
	
	//On cree un array vide pour le retour. Si rien ne match, on le retournera
	var returnClubs = [];
	
	//On parcourt les clubs de la variable brute des données, et on compare
	//à la chaîne de caractères donnée par l'utilisateur
	for (var i = 0; i < initialState.rawData.clubs.length; i++){
		
		if (initialState.rawData.clubs[i].name.toUpperCase().includes(club.toUpperCase())){
			
			returnClubs.push(initialState.rawData.clubs[i]);
			
		}
		
	}
	
	return returnClubs;
	
}

//On crée la fonction modifyRawData qui permet d'ajouter des clubs aux données de base
const modifyRawData = (club) => {
	
	var newRawData = initialState.rawData;
	newRawData.clubs = [ ...newRawData.clubs, club];
	
	return newRawData;
	
}

const actionTypes = {
	SEARCH_CLUB: 'SEARCH_CLUB',
	ADD_CLUB: 'ADD_CLUB',
	UPDATE_CLUBS: 'UPDATE_CLUBS',
	RESET_RELATIONSHIPS: 'RESET_RELATIONSHIPS'
}

export const actions = {
	
	searchClub: (club) => ({ type: actionTypes.SEARCH_CLUB, club }),
	addClub: (club) => ({ type: actionTypes.ADD_CLUB, club }),
	updateClubs: () => ({ type: actionTypes.UPDATE_CLUBS }),
	resetRelationships: (clubs) => ({ type: actionTypes.RESET_RELATIONSHIPS, clubs})
	
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		
		case actionTypes.SEARCH_CLUB:
			return { ...state, clubs: searchClubs(action.club) }
			
		case actionTypes.ADD_CLUB:
			return { ...state, rawData: modifyRawData(action.club) }
			
		case actionTypes.UPDATE_CLUBS:
			return { ...state, clubs: state.rawData.clubs }
			
		case actionTypes.RESET_RELATIONSHIPS:
			return { ...state, relationships: getRelationships(state.clubs) }
			
		default: return state
	}
}

export default createStore(reducer, applyMiddleware(thunk))