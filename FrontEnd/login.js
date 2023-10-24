//Récupérer le formulaire
const loginForm = document.querySelector("#loginform");

async function postLoginForm () {
  // Récupérer des valeurs du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
 // Envoi de la requête à l'API avec fetch
    const response = await fetch ("http://localhost:5678/api/users/login",{
      method: "post",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    });
    const result = await response.json();

    if (!result.token) {
      // Afficher le message d'erreur 
      const errorMsg = document.querySelector("#errormsg");
      errorMsg.innerText = "L'email ou le mot de passe n'est pas correct";
    } else {
      // stocker le token d'identification 
        localStorage.setItem("token", result.token);
        // Redirection vers la page index.html
        window.location.href= "index.html";
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); //Empêcher la soumission par défaut du formulaire

    postLoginForm (); 
})
  