//Recuperer les donnes des gallery sur API
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();

  let gallery = document.querySelector(".gallery");
  data.forEach((works) => {
    gallery.innerHTML += ` 
                <figure>
                    <img src="${works.imageUrl}" alt="${works.title}">
                    <figcaption>${works.title}</figcaption>
                </figure>`;
  });
}
getWorks();

// Récupération dynamique des Catégories
async function getcategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  const category = await response.json();

  const filtres = document.querySelector(".filter");
  for (let i = 0; i < category.length; i++) {
    const btnElement = document.createElement("button");
    btnElement.innerText = category[i].name;
    filtres.classList.add("filter");
    btnElement.classList.add("button");
    filtres.appendChild(btnElement);
  }
  // Créer le bouton tous
  const btnTous = document.createElement("button");
  btnTous.innerText = "Tous";
  btnTous.classList.add("button");
  filtres.insertBefore(btnTous, filtres.children[0]);
}
getcategory();
