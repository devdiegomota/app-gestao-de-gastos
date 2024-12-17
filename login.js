import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig  = {
    apiKey: "AIzaSyBdwnBgSGDXFw7LKhOWZcC7qucnYI0KbVE",
    authDomain: "controle-de-gastos-83eb5.firebaseapp.com",
    projectId: "controle-de-gastos-83eb5",
    storageBucket: "controle-de-gastos-83eb5.appspot.com",
    messagingSenderId: "672245601640",
    appId: "1:672245601640:web:4f17d445b38d4a49a7b2dd"
};

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

// Initialize Firebase

const app = initializeApp(firebaseConfig);


//BOTOES


const recoverpass = document.getElementById('recover-password-b');
recoverpass.addEventListener("click", RecoveryPassword);

const submit = document.getElementById('login-button');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    //Inputs

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //FAZER LOGIN
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // Signed up 
            const user = userCredential.user;

            window.location.href = "home.html"
            // ...
        })
        .catch((error) => {
            alert(GetErrorMessage(error))
            const errorCode = error.code;
            const errorMessage = error.message;

            //TRANSFORMAR ERRO EM MENSAGEM
            function GetErrorMessage(error) {

                if (error.code == 'auth/invalid-credential') {
                    return ('Verifique usuario ou senha')
                }
                else if (error.code == 'auth/invalid-email') {
                    return ('Email inválido')
                }
                else if (error.code == 'auth/too-many-requests') {
                    return ('Conta bloqueada por muitas tentativas. Altere a senha.')
                }
            }
            /*
            alert(errorMessage)
            alert(errorCode)*/
            // ..
        });
})
//RECUPERAR O PASSWORD
function RecoveryPassword() {

    const email = document.getElementById('email').value;

    ShowLoading();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {

            alert('Email enviado')
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            //alert(GetErrorMessage(error))
            alert(errorCode)
            //alert(errorMessage)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
}

