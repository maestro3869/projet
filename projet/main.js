"use strict"
/* _-_-_-_-_-_-_ variables _-_-_-_-_-_-_  */
const ajout = 'ajout';
const btntoggle = document.querySelector('#toggle');
const Formulaire = document.querySelector("form");
const perso = document.querySelector('#personnages');

/* _-_-_-_-_-_-_ Fonctions _-_-_-_-_-_-_  */
function toggleFormulaire(){
    //console.log("affiche ou cache le formulaire" )
    Formulaire.classList.toggle("hide");
}
/**
 * Récupére les données dans le localstorage
 */
function loadDatas() {
	let json = localStorage.getItem(ajout);
	
	//si rien dans le localstorage alors on part d'un tableau vide
	let list = [];
	if (json != null) {
		//sinon, on transforme le tableau d'inscrits existant (json) en objet complexe manipulable en JS
		list = JSON.parse(json);
	}
	return list;
}
/**
 * Enregistrer un nouvel inscrit
 * @param {Event} event 
 */


function handleSubmit(event){
    event.preventDefault()
    let list = loadDatas();
    let personnage = {
         firstname : document.querySelector("#firstname").value,
         name : document.querySelector("#name").value,
         image :  document.querySelector("#url").value,
         faction : document.querySelector("#faction").value,
         photo : Array.from(document.querySelectorAll("input[type=checkbox][name=image]:checked"), e => e.value)
    };
    console.log(personnage);
    //ajout du nouvel inscrit à la liste
	list.push(personnage);
	//convertir en liste en JSON
	let jsonList = JSON.stringify(list);
	//ajoute la liste avec le nouvel inscrit dans le localstorage
	localStorage.setItem(ajout, jsonList);

	//afficher la liste des inscrits ACTUALISEE
	displayList();

	//vider les champs du formulaire - réinitialiser le form
	Formulaire.reset();

}

function displayList() {
	//récupération de la liste dans le localstorage
	let list = loadDatas();
	//vide tout ce qui se trouvait dans la UL
	perso.innerHTML = "";
	//affiche dans la UL chaque inscrit
	list.forEach(
		(ligne, index) =>(perso.innerHTML += `<li><strong>${ligne.firstname} </strong>- ${ligne.name}-${ligne.url}-${ligne.faction}-${ligne.photo}</li>`)
	);
}

/* _-_-_-_-_-_-_ code principal _-_-_-_-_-_-_  */
btntoggle.addEventListener("click",toggleFormulaire)
NiceSelect.bind(document.querySelector("#faction"), { searchable: true });
displayList();
Formulaire.addEventListener("submit", handleSubmit)
