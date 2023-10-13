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
