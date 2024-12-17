import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBdwnBgSGDXFw7LKhOWZcC7qucnYI0KbVE",
    authDomain: "controle-de-gastos-83eb5.firebaseapp.com",
    projectId: "controle-de-gastos-83eb5",
    storageBucket: "controle-de-gastos-83eb5.appspot.com",
    messagingSenderId: "672245601640",
    appId: "1:672245601640:web:4f17d445b38d4a49a7b2dd"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//MANTEM USUARIO LOGADO MESMO RECARREGANDO A PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    UserLoged();
    // Sua função aqui
  
  });

//VERIFICA SE O USUARIO TA LOGADO
function UserLoged () {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        window.location.href = "home.html"
    
      }
    });
}

//Register button

const submit = document.getElementById('register-button');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    //Inputs

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            
            window.location.href = "register-sucess.html"
            // ...
        })

        .catch((error) => {
            alert(GetErrorMessage(error))
            const errorCode = error.code;
            const errorMessage = error.message;
            
            function GetErrorMessage(error) {
              
                if (error.code == 'auth/weak-password'){
                    return ('Senha muito curta')
                }
                else if (error.code == 'auth/email-already-in-use'){
                    return ('Usuario ja cadastrado. Faça login.')
                }
            }
            /*return (error.message)*/
            /*alert(errorMessage)*/
            // ..
        });
})




