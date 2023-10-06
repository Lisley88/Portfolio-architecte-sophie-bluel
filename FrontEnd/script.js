//Recuperer les donnes sur API 
// let gallery =[]
async function getWorks(){
   await fetch("http://localhost:5678/api/works")
   .then( response => response.json())
   .then( data => {
        let gallery = document.querySelector(".gallery")
        data.forEach(works => {
            gallery.innerHTML +=  ` 
                <figure class="item">
                    <img src="${works.imageUrl}" alt="${works.title}">
                    <figcaption>${works.title}</figcaption>
                </figure>`
          })
      })
 }

 getWorks()
 
   
 

