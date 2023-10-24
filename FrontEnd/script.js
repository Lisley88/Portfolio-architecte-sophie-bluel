const gallery = document.querySelector(".gallery");
let data = [];
//Récuperer les travaux via API
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  data = await response.json();
  //Affichage des travaux sur la page d'accueil
  data.forEach((works) => {
    gallery.innerHTML += ` 
                <figure id="${works.categoryId}" data-id="${works.id}" class="figimg">
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
btnTousFiltre.classList.add("active");
btnTousFiltre.addEventListener("click", function () {
  for (let i = 0; i < worksElements.length; i++) {
    worksElements[i].style.display = "block";
    btnTousFiltre.classList.add("active");
    btnAppartements.classList.remove("active");
    btnHotelsRestaurants.classList.remove("active");
    btnObjets.classList.remove("active");
  }
});

btnObjets.addEventListener("click", function () {
  //Créer une constante pour filtrer les travaux de type "objet"
  const objets = data.filter(function (work) {
    return work.categoryId === 1;
  });
  btnTousFiltre.classList.remove("active");
  btnAppartements.classList.remove("active");
  btnHotelsRestaurants.classList.remove("active");
  // Parcourir le tableau worksElements
  for (let i = 0; i < worksElements.length; i++) {
    //condition "si l'élément parcouru dans le tableau works est un élément présent dans la constante objets"
    //si true, on affiche le worksElements parcouru, sinon, on le cache
    objets.includes(data[i])
      ? (worksElements[i].style.display = "block") &&
        btnObjets.classList.add("active")
      : (worksElements[i].style.display = "none");
  }
});

btnAppartements.addEventListener("click", function () {
  const appartements = data.filter(function (work) {
    return work.categoryId === 2;
  });
  btnTousFiltre.classList.remove("active");
  btnObjets.classList.remove("active");
  btnHotelsRestaurants.classList.remove("active");
  for (let i = 0; i < worksElements.length; i++) {
    appartements.includes(data[i])
      ? (worksElements[i].style.display = "block") &&
        btnAppartements.classList.add("active")
      : (worksElements[i].style.display = "none");
  }
});

btnHotelsRestaurants.addEventListener("click", function () {
  const HotelsRestaurants = data.filter(function (work) {
    return work.categoryId === 3;
  });
  btnTousFiltre.classList.remove("active");
  btnObjets.classList.remove("active");
  btnAppartements.classList.remove("active");
  for (let i = 0; i < worksElements.length; i++) {
    HotelsRestaurants.includes(data[i])
      ? (worksElements[i].style.display = "block") &&
        btnHotelsRestaurants.classList.add("active")
      : (worksElements[i].style.display = "none");
  }
});

// récupération du token dans le local Storage
const token = localStorage.getItem("token");

const modeEdition = document.querySelector(".mode-edition");
const btnModifier = document.querySelector(".btn-modifier");
const filtresLogin = document.querySelector(".filter");

if (token) {
  // Cacher les filtres
  filtresLogin.style.display = "none";
  // Afficher la barre noire de modification
  modeEdition.style.display = "flex";
  // Afficher le bouton de modification
  btnModifier.style.display = "flex";
  // Ajouter les espaces entres title et projets
  const mesProjets = document.querySelector(".title-projets");
  mesProjets.style.marginBottom = "68px";
  // Changement du login en logout
  let btnLog = document.querySelector(".log");
  btnLog.innerHTML = "logout";
  // Retirer le token du localStorage au logout
  btnLog.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
}

// Open modal 1
const openModal = document.querySelector(".btn-modifier");
const modal1 = document.querySelector(".modal1-container");
openModal.addEventListener("click", function () {
  modal1.style.display = "flex";
});

//afficher les travaux via l'API
let petitGallery = document.querySelector(".modal1-gallery");
function creerpetitGallery() {
  data.forEach((works) => {
    petitGallery.innerHTML += ` 
                  <figure class="card" data-id="${works.id}">
                    <img src="${works.imageUrl}" alt="${works.title}">
                    <div class="trash-can">
                    <i class="fa-solid fa-trash-can fa-xs" data-id="${works.id}"></i>
                    </div>
                  </figure>`;
  });
}
creerpetitGallery();

//suprimer les travaux
const btnTrash = document.querySelector(".trash-can i");
petitGallery.addEventListener("click", (event) => {
  event.preventDefault();
  
  if (event.target.tagName === "I") {
    // alert(11)
    console.log(event.target.dataset.id);
  }
  fetch("http://localhost:5678/api/works/" + `${event.target.dataset.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
  
  .then((response) => response.json())
    .then((response) => {
      if (response.status == 204) {
        event.preventDefault();
        alert("suppression faite avec succes!");
        data.splice(event.target.dataset.id, 1);
        

      }
      if (response.status == 401) {
        alert(
          "Veuillez vous authentifier de nouveau! votre token est expiré !"
        );
      }
    })
    .catch(function (error) {
      console.log("Erreur lors de la suppression : " + error.message);
    });
    
});


// Fermer modal 1
// 1. fermer la modal 1 au click sur la croix
const cross = document.querySelector(".modal1-cross");
cross.addEventListener("click", () => {
  modal1.style.display = "none";
});
//2. fermer la modale 1 au clique en dehors de la modal
const modalOverlay = document.querySelector(".overlay");
modalOverlay.addEventListener("click", function (event) {
  if (event.target == modalOverlay) {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
});
//Open modal 2
const openModal2 = document.querySelector(".modal1-button");
const modal2 = document.querySelector(".modal2-container");
openModal2.addEventListener("click", function () {
  modal1.style.display = "none";
  modal2.style.display = "flex";
});
// retouner la modal 1 au click sur la flèche
const modal2Arrow = document.querySelector(".modal2-arrow");
modal2Arrow.addEventListener("click", () => {
  modal1.style.display = "flex"; // on retire le display none pour rendre visible et ouvrir la modalstep1 //
  modal2.style.display = "none"; // on ajoute le display none pour rendre invisible et fermer la modalstep2 //
});
//1. fermer la modal 2 au click sur la croix
const modal2Cross = document.querySelector(".modal2-cross");
modal2Cross.addEventListener("click", () => {
  modal2.style.display = "none";
});
//2. fermer la modale 2 au clique en dehors de la modal
const modalOverlay2 = document.querySelector(".overlay2");
modalOverlay2.addEventListener("click", function (event) {
  if (event.target == modalOverlay2) {
    modal2.style.display = "none";
  }
});

//pour l'apercu de l'image dans la formulaire
let image = document.getElementById("uploadimg");
image.addEventListener("change", function () {
  let file = document.getElementById("uploadimg").files;
  let petitImage = document.getElementById("preview");
  const icone = document.querySelector(".addimg svg");
  const addPhoto = document.querySelector(".uploadimgage");
  const detailPhoto = document.querySelector(".detail-photo");
  if (file.length > 0) {
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      petitImage.style.display = "block";
      petitImage.setAttribute("src", event.target.result);
      petitImage.style.width = "129px";
      petitImage.style.height = "169px";
      image.style.display = "none";
      icone.style.display = "none";
      addPhoto.style.display = "none";
      detailPhoto.style.display = "none";
    };
    fileReader.readAsDataURL(file[0]);
  }
});

// créer les options des catégories
for (let i = 0; i < category.length; i++) {
  const selectCategory = document.getElementById("selectcategory");
  const categorie = document.createElement("option");
  categorie.className = `selectCategoryElement`;
  categorie.id = `${category[i].name}`;
  categorie.value = category[i].id;
  categorie.innerText = `${category[i].name}`;
  selectCategory.appendChild(categorie);
}
//le bouton Valider en vert si tous les champs sont remplis
let titre = document.getElementById("title");
let categorie = document.getElementById("selectcategory");
const validAjoutPhoto = document.querySelector(".modal2-valide");
function checkFormInputs() {
  image = document.getElementById("uploadimg");
  titre = document.getElementById("title");
  categorie = document.getElementById("selectcategory");
  if (
    image.value.length > 0 &&
    titre.value.length > 0 &&
    categorie.value.length > 0
  ) {
    validAjoutPhoto.style.backgroundColor = "#1D6154";
  } else {
    validAjoutPhoto.style.backgroundColor = "";
  }
}
// écouteur d'évènement pour checker les inputs de formulaire
Array.from(document.getElementById("envoyerimg")).forEach(function (element) {
  element.addEventListener("change", function () {
    checkFormInputs();
  });
});

//Créer formData pour envoyer la formulaire
const formEl = document.getElementById("envoyerimg");
formEl.addEventListener("submit", (event) => {
event.preventDefault();
  const newWorkTitle = document.getElementById("title").value;
  const newWorkCategory = document.getElementById("selectcategory").value;
  const newWorkImage = document.getElementById("uploadimg").files[0];

  const formData = new FormData();
  formData.append("image", newWorkImage, newWorkImage.name);
  formData.append("title", newWorkTitle);
  formData.append("category", newWorkCategory);

  console.log("image", newWorkImage);

  fetch("http://localhost:5678/api/works", {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.ok) {
        window.alert("envoye avec succes");
      }
    });
    
});
