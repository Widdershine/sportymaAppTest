# Evaluation Sportyma App

## Introduction

La présente application a été développée dans le cadre de l'évaluation développeur 
React Native de Sportyma. Conformément aux instructions, celle-ci a pour but de 
permettre l'affichage de plusieurs clubs de football, ainsi que la navigation entre 
ceux-ci et les joueurs qui leurs appartiennent.

L'application est décomposée en quatre écrans:

	- L'écran d'accueil, permettant l'affichage des clubs avec leurs logos, 
	la recherche d'un club via un champ texte, ainsi que l'ajout d'un club;
	
	- L'écran des clubs, affichant les détails d'un club sélectionné et la liste de 
	ses joueurs;
	
	- L'écran des joueurs, affichant pour un joueur choisi l'ensemble des clubs dans 
	lesquels il a joué, par saison, avec les statistiques correspondantes;
	
	- L'écran d'ajout de club, affichant un formulaire avec les champs nécessaires
	aux données du nouveau club: nom du club, logo (requiert un lien vers une image
	externe), et le pays. De plus, une checkbox permet à l'utilisateur de préciser
	s'il souhaite ou non regénerer les données de relations entre clubs et joueurs,
	pour peupler le nouveau club.
	
## Contenu

	- Code source
	- readme
	- SportymaApp.apk

## Données

Les données sont décomposées en trois groupes:

	- La liste des clubs, statique, obtenue depuis le fichier footballData.js. 
	Il y a dans le cadre de cette application quatre clubs renseignés. Lorsque
	l'utilisateur ajoute un club via la page d'ajout, celui-ci se greffera aux
	données brutes stockées sur l'application, mais disparaîtra à la fermeture
	de celle-ci.
	Paramètres: id (identifiant unique), name (nom du club), logo et country.
	
	- La liste des joueurs. A l'instar de celle des clubs, elle est statique et
	stockée dans footballData.js. 115 joueurs ont été créés pour cette application.
	Paramètres: id (identifiant unique), lName (nom de famille), fName (prénom).
	
	- La liste des relations entre joueurs et clubs. Cette liste est générée 
	aléatoirement en associant sur 5 saisons (2017 à 2021) un ou deux clubs à 
	chaque joueur. A chaque connexion entre un joueur et son club, un nombre aléatoire
	de buts marqués et de matchs joués y sont associés. Le numéro du joueur quant à lui
	est incrémenté et va donc de 1 au nombre maximum de joueurs de ce club.
	Paramètres: id, player (id du joueur), club (id du club), season (saison),
	number (numéro du joueur), nbMatchs (nombre de matchs joués), nbButs (nombre de buts
	marqués dans ce club pour cette saison).
	
Les données sont stockées dans un state Redux, auquel chacun des trois écrans fera appel
pour l'affichage.

## Utilisation

Le chemin d'utilisation de l'application commence par la page d'accueil. Sur celle-ci,
l'utilisateur a le choix de sélectionner l'un des clubs affichés, ou entrer un nom de 
club dans le champ texte pour raccourcir la liste des clubs (par soucis de simplicité,
seulement 4 clubs ont été implémentés, aussi l'intérêt de cette fonctionnalité reste 
limité dans cette configuration). 

A n'importe quel moment, l'utilisateur peut décider d'accéder à la page d'ajout de clubs
depuis l'accueil. Lorsque celui-ci remplit correctement les champs (Nom du club et pays
ne doivent pas être vides, et le lien vers l'image doit être validé par la regex),
le nouveau club est ajouté aux données brutes, les données de club utilisées pour
l'affichage sur l'accueil sont mises à jour, et l'utilisateur est renvoyé sur la page
d'accueil. Si l'utilisateur a validé la demande de génération de nouvelles données,
toutes les relations précédentes sont effacées et redistribuées sur la nouvelle liste
de clubs.

La suite du chemin utilisateur amène à la page des clubs. Ici, les détails du club sont
affichés dans un encadré (où la saison en cours, définie de manière statique par
simplicité, est mentionnée). La suite de cet encadré est la liste des joueurs de ce club
pour la saison en cours, affichée au sein d'un flatlist.

Enfin, lors de la sélection d'un joueur, l'écran des joueurs s'ouvre. Celui-ci répertorie 
toutes les informations du joueur dans un encadré, lui aussi suivi d'un flatlist qui 
affiche, par saison, l'ensemble des clubs dans lesquels le joueur a performé. Pour
chacun de ces clubs sont mentionnés les numéros, nombre de matchs et nombre de buts du
joueur.

## Notes

Le projet a été développé via expo, un outil de production React Native. Le fichier apk
distribué ici a lui même été généré via cette plateforme.
