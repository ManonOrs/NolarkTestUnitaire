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
    let sexef = '#rd_femme' ;
    let sexeh = '#rd_homme';
    let poids = getInt('#num_poids');
    let nbVerres = getInt('#num_verres');
    let sexe;    
    if(sexef === getString('#sexe input[type="radio"]:checked')){
        sexe = '#rd_femme';
    }else{
        sexe = '#rd_homme';
    }
    return getAlcoolemie(sexe, poids, nbVerres);
}

function afficherAlcoolemie(){
    let elH2 = window.document.querySelector('#alcoolemie');
    /* utilisation de #remuneration au lieu de #prime pour réutiliser les règles
     * CSS définie dans simulateur.css
     * Si #remuneration (<h2 id='remuneration'></h2>) n'existe pas, on le créé */
    let sexef = '#rd_femme' ;
    let sexeh = '#rd_homme';
    let poids = getInt('#num_poids');
    let nbVerres = getInt('#num_verres');
    let sexe;    
    if(sexef === getString('#sexe input[type="radio"]:checked')){
        sexe = '#rd_femme';
    }else{
        sexe = '#rd_homme';
    }
    let alcoolemie = getAlcoolemie(sexe, poids, nbVerres);
    
    if (!elH2) {
        elH2 = window.document.createElement('h3');
        elH2.id = 'alcoolemie';
        window.document.querySelector('#resultats').appendChild(elH2);
    }
    
    let elH3 = window.document.querySelector('#emende');
    if (!elH3) {
        elH3 = window.document.createElement('h3');
        elH3.id = 'amende';
        window.document.querySelector('#resultats').appendChild(elH3);
    }
    
    
    // Gestion de l'affichage avec gestion particulière pour 0 et 1 accident
        elH2.innerHTML = 'Alcoolémie ' + alcoolemie + ' g/l de sang';
//        elH2.innerHTML = 'Amende : ' + alcoolemie + ' g/l de sang';
        
    }
}