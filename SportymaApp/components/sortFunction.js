import React from 'react';

function maxSorting(myArray,comparaison,debut,pivotA,arrayID) {
  
  if (debut < pivotA && pivotA > 0) {
        
    /** On va maintenant boucler sur tous les index avant 
    le pivot afin de vérifier si celui-ci est à son 
    emplacement. */
    
    var tempPivot = myArray[pivotA];
        
    for (var i = debut;i<=(pivotA-1);i++) {
      
      var tempTemp = myArray[i];
      if (tempPivot < tempTemp){
		var tempCompare = -1;
	  }
	  else if (tempPivot > tempTemp){
		var tempCompare = 1;
	  }
	  else{
		var tempCompare = 0;
	  }
      
      if (tempCompare == comparaison || tempCompare == 0) {
        
        var idTemp = arrayID[i];
        
        arrayID[i] = arrayID[debut];
        arrayID[debut] = idTemp;
        
        myArray[i] = myArray[debut];
        myArray[debut] = tempTemp;
        debut = debut+1;
      
      }
    
    }
   
    var idTemp = arrayID[pivotA];
       
    arrayID[pivotA] = arrayID[debut];
    arrayID[debut] = idTemp;
    myArray[pivotA] = myArray[debut];
    myArray[debut] = tempPivot;
   
  }
  
  return [myArray,(debut),arrayID];

}

/** 
    &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
*/

function myQuickSort(myArray,comparaison){

  /** Cette fonction permet de trier dans l'ordre 
  myOrder (1 = croissant, -1 = décroissant) 
  l'array myArray en utilisant l'algorithme de tri 
  QuickSort. L'array retourné est un array 2D 
  arraySorted[i][j] avec i = [0 , 1], où les j
  valeurs en i = 0 sont les données de myArray
  triées, et les j valeurs en i = 1 les positions 
  originales dans myArray. */
  
  /** Enfin on boucle. Tant qu'il y a eu des déplacements,
  on retourne. */
  var low = 0;
  var high = myArray.length;
  
  var arrayID = [];
  
  for (var i = 0;i<high;i++){
  
    arrayID[i] = i+1;
  
  }
  
  var compteur = 1;
  var bornes = [];
  var flagOk = false;
  /**var k = 0;
  var myCompt = [];*/
  
  while (flagOk == false || compteur > 0) {
    
    /**k = k+1;*/
    flagOk = true;
    
    if (low < high) {
    
      bornes[compteur]=[];
      
      bornes[compteur][0] = low;
      bornes[compteur][1] = high;
      
      var pivot = high;
    
      var Results = maxSorting(myArray,comparaison,low,pivot-1,arrayID);
      
      arrayID = Results[2];
      myArray = Results[0];
          
      /** on va chercher les bornes du niveau supérieur afin 
      de verifier si nous sommes dans la partie gauche ou droite 
      de l'ensemble. Si à gauche, on passe à droite, si à droite,
      on remonte d'un niveau. Si niveau au dessus est 0, on 
      termine. */
      
      if (Results[1] >= pivot) {
        
        while (compteur > 1 && (Results[1] >= bornes[compteur-1][1])) {
        
          compteur = compteur - 1;
          
        }
        
        if (compteur-1 == 0) {
        
          if (Results[1] >= bornes[compteur][1]) {
          
            compteur = compteur-1;
            flagOk = true;
          
          }
        
        }
        
        else {
          
          low = Results[1]+1;
          high = bornes[compteur-1][1];
          flagOk = false;
        
        }
      
      }
      
      else {
      
        compteur = compteur + 1;
        high = Results[1];
        flagOk = false;
      
      }
      
    }
    
    else {
    
    while (compteur > 1 && (high >= bornes[compteur-1][1])) {
        
          compteur = compteur - 1;
          
        }
        
        if (compteur-1 == 0) {
        
          if (high >= bornes[compteur][1]) {
          
            compteur = compteur-1;
            flagOk = true;
          
          }
        
        }
        
        else {
          
          low = high+1;
          high = bornes[compteur-1][1];
          flagOk = false;
        
        }
      
      }
    
    }
    
    
  /** var prout = plop; */
  return [myArray,arrayID];
  
}

export default myQuickSort;