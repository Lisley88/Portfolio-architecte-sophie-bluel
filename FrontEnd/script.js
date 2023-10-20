const gallery = document.querySelector(".gallery");
let data = [];
//Récuperer les travaux via API
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  data = await response.json();
  //Affichage des travaux sur la page d'accueil
  data.forEach((works) => {
    gallery.innerHTML += ` 
                <figure id="${works.categoryId}">
                    <img src="${works.imageUrl}" alt="${works.title}">
                    <figcaption>${works.title}</figcaption>
                </figure>`;
  });
}
getWorks();

// Récupération dynamique des Catégories
const response = await fetch("http://localhost:5678/api/categories");
const category = await response.json();

const filtres = document.querySelector(".filter");
//Créer les boutons de filtres
for (let i = 0; i < category.length; i++) {
  const btnElement = document.createElement("button");
  btnElement.innerText = category[i].name;
  filtres.classList.add("filter");
  btnElement.classList.add("button");
  btnElement.id = category[i].name.replaceAll(" ", "").replace("&", "");
  filtres.appendChild(btnElement);
}
//Créer le bouton "tous"
const btnTous = document.createElement("button");
btnTous.innerText = "Tous";
btnTous.classList.add("button");
btnTous.id = "tous";
filtres.insertBefore(btnTous, filtres.children[0]);

//Récupérer des boutons de filtres
const worksElements = document.querySelectorAll(".gallery figure");
const btnTousFiltre = document.querySelector("#tous");
const btnObjets = document.querySelector("#Objets");
const btnAppartements = document.querySelector("#Appartements");
const btnHotelsRestaurants = document.querySelector("#Hotelsrestaurants");

btnTousFiltre.addEventListener("click", function () {
  for (let i = 0; i < worksElements.length; i++) {
    worksElements[i].style.display = "block";
  }
});

btnObjets.addEventListener("click", function () {
  //Créer une constante pour filtrer les travaux de type "objet"
  const objets = data.filter(function (work) {
    return work.categoryId === 1;
  });
  // Parcourir le tableau worksElements
  for (let i = 0; i < worksElements.length; i++) {
    //condition "si l'élément parcouru dans le tableau works est un élément présent dans la constante objets"
    //si true, on affiche le worksElements parcouru, sinon, on le cache
    objets.includes(data[i])
      ? (worksElements[i].style.display = "block")
      : (worksElements[i].style.display = "none");
  }
});

btnAppartements.addEventListener("click", function () {
  const appartements = data.filter(function (work) {
    return work.categoryId === 2;
  });
  for (let i = 0; i < worksElements.length; i++) {
    appartements.includes(data[i])
      ? (worksElements[i].style.display = "block")
      : (worksElements[i].style.display = "none");
  }
});

btnHotelsRestaurants.addEventListener("click", function () {
  const HotelsRestaurants = data.filter(function (work) {
    return work.categoryId === 3;
  });
  for (let i = 0; i < worksElements.length; i++) {
    HotelsRestaurants.includes(data[i])
      ? (worksElements[i].style.display = "block")
      : (worksElements[i].style.display = "none");
  }
});

// récupération du token dans le local Storage
const token = localStorage.getItem("token");

const modeEdition = document.querySelector(".mode-edition");
const btnModifier = document.querySelector(".btn-modifier");
const filtresLogin = document.querySelector(".filter")

if (token) {
  // Cacher les filtres
  filtresLogin.style.display = "none";
  // Afficher la barre noire de modification
  modeEdition.style.display = "flex";
  // Afficher le bouton de modification
  btnModifier.style.display = "flex";
  // Ajouter les espaces entres title et projets
  const mesProjets = document.querySelector(".title-projets")
  mesProjets.style.marginBottom = "68px"
  // Changement du login en logout
  let btnLog = document.querySelector(".log");
  btnLog.innerHTML = "logout";
  // Retirer le token du localStorage au logout
  btnLog.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href ="index.html";
  })
}





// Open modal 1
const openModal = document.querySelector(".btn-modifier")
const modal1 = document.querySelector(".modal1-container")
openModal.addEventListener('click', function() {
    modal1.style.display = "flex";

});

//afficher les travaux via l'API
const petitGallery = document.querySelector(".modal1-gallery");
function creerpetitGallery() {
  data.forEach((works) => {
    petitGallery.innerHTML += ` 
                  <div class="card">
                    <img src="${works.imageUrl}" alt="${works.title}">
                    <div class="trash-can">
                    <i class="fa-solid fa-trash-can fa-xs"></i>
                    </div>
                  </div>`;
  });
  }
  creerpetitGallery()

// Fermer modal 1
// 1. fermer la modal 1 au click sur la croix
const cross = document.querySelector(".modal1-cross")
cross.addEventListener("click",() => {
  modal1.style.display = "none";
});
//2. fermer la modale 1 au clique en dehors de celle-ci
const modalOverlay = document.querySelector(".overlay")
modalOverlay.addEventListener("click", function(event) {
if (event.target == modalOverlay) { 
   modal1.style.display = "none"; 
}
});
