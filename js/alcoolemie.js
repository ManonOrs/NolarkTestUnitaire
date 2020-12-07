import {recupValeur} from './remuneration.js';

///**
// * Listeners sur les inputs
// * 
// */
//window.addEventListener('load', function () {
//    // tabEvents est une collection d'évenements
//    let tabEvents = ['keyup', 'click'];
//
//    // tabInputs est une collection de <input>
//    let tabInputs = window.document.querySelectorAll('input[type="number"]');
//
//    // Parcours de tabInputs en s'appuyant sur le nombre de <input> et sur tabEvents
//    for (let i = 0; i < tabInputs.length; i++) {
//        for (let j = 0; j < tabEvents.length; j++) {
//            // Ajout d'un Listener sur tous les <input> sur les évènements listés dans tabEvents
//            tabInputs[i].addEventListener(tabEvents[j], lancerCalcul);
//        }
//    }
//});


/**
* Fonction qui retourne l'alcool pur ingéré en fonction du nombre
* de verre
*
* @param {int} nbVerres
* @returns {int}
*/
function getAlcoolPur(nbVerres) {
 const uniteAlcool = 10;
 return uniteAlcool * nbVerres;
}


/**
* Fonction qui retourne le coefficient de diffusion en fonction du sexe
*
* @param {string} sexe
* @returns {float}
*/
function getCoefDiffusion(sexe) {
 const coefDiffuH = 0.7, coefDiffuF = 0.6;
 if (sexe === 'homme') {
 return coefDiffuH;
 } else {
 return coefDiffuF;
 }
}

/**
* Fonction qui retourne l'alcoolémie en fonction du sexe, du poids et du
* nombre de verres ingérés
*
* @param {string} sexe
* @param {int} poids
* @param {int} nbVerres
* @returns {float}
*/
function getAlcoolemie(sexe, poids, nbVerres) {
 // /!\ division par 0, on ne veut pas provoquer la destruction de l'univers ;o)
 if (poids > 0) {
 return (getAlcoolPur(nbVerres) / (poids * getCoefDiffusion(sexe))).toFixed(2);
 } else {
 return 0;
 }
}

/**
* Fonction qui retourne l'amende encourue en fonction de l'alcoolémie
*
* @param {float} alcoolemie
* @returns {string}
*/
function getAmende(alcoolemie) {
 const seuil = 0.8;
 if(alcoolemie < seuil) {
 return 'Minorée : 90 € / Forfaitaire : 135 € / Majorée : 375 €';
 } else {
 return '4500 €';
 }
}

/**
* Fonction qui retourne la sanction encourue en fonction de l'alcoolémie
*
* @param {float} alcoolemie
* @returns {string}
*/
function getSanction(alcoolemie) {
 const seuil = 0.8;
 if (alcoolemie < seuil) {
 return '6 points + suspension 3 ans';
 } else {
 return '6 points + 2 ans de prison + suspension 3 ans + stage de sensibilisation';
 }
}

/**
* Fonction qui retourne une valeur entière récupérée via
* window.document.querySelector(id)
*
* @param {string} id
* @returns {integer}
*/
function getInt(id) {
 let valeur = parseInt(window.document.querySelector(id).value);
 if (isNaN(valeur)) {
 window.document.querySelector(id).value = 0;
 return 0;
 }
 else {
 return valeur;
 }
}

/**
* Fonction qui retourne un string récupéré dans un champ via son id
*
* @param {string} id
* @returns {string}
*/
function getString(id) {
 return window.document.querySelector(id).value;
}

function lancerCalcul(){
 // Déclaration et affectation des variables
    let sexe = getString('#resultats input[type="radio"]:checked');
    let poids = recupValeur('#num_poids');
    let nbVerres = recupValeur('#num_verre');
    
    let alcoolemie = getAlcoolemie(sexe,poids,nbVerres);
    let amende = getAmende(alcoolemie);
    let sanction = getSanction(alcoolemie);
    
    // Gestion de l'affichage de la prime en fonction du nombre d'accidents
    afficherAlcoolemie(alcoolemie,amende,sanction);
}

function afficherAlcoolemie(alcoolemie,amende,sanction){
    let elH2 = window.document.querySelector('#alcoolemie');
    /* utilisation de #remuneration au lieu de #prime pour réutiliser les règles
     * CSS définie dans simulateur.css
     * Si #remuneration (<h2 id='remuneration'></h2>) n'existe pas, on le créé */
    
//    if (!elH2) {
//        elH2 = window.document.createElement('h3');
//        elH2.id = 'alcoolemie';
//        window.document.querySelector('#test').appendChild(elH2);
//    }
    
    let elH3 = window.document.querySelector('#amende');
//    if (!elH3) {
//        elH3 = window.document.createElement('h3');
//        elH3.id = 'amende';
//        window.document.querySelector('#test').appendChild(elH3);
//    }
    
    let elH4 = window.document.querySelector('#sanction');
//    if (!elH4) {
//        elH4 = window.document.createElement('h3');
//        elH4.id = 'sanction';
//        window.document.querySelector('#test').appendChild(elH4);
//    }
    
    
    // Gestion de l'affichage
        elH2.innerHTML = 'Alcoolémie ' + alcoolemie + ' g/l de sang';
        elH3.innerHTML = 'Amende : ' + amende;
        elH4.innerHTML = 'Sanction : ' + sanction;
        
    }