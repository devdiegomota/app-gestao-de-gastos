import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";


const firebaseConfig  = {
    apiKey: "AIzaSyBdwnBgSGDXFw7LKhOWZcC7qucnYI0KbVE",
    authDomain: "controle-de-gastos-83eb5.firebaseapp.com",
    projectId: "controle-de-gastos-83eb5",
    storageBucket: "controle-de-gastos-83eb5.appspot.com",
    messagingSenderId: "672245601640",
    appId: "1:672245601640:web:4f17d445b38d4a49a7b2dd"
};

const app = initializeApp(firebaseConfig);

 //CHAMA O BOTAO DESLOGAR E MONITORA OS CLIQUES NELE PARA CHAMAR FUNCAO
const logoutt = document.getElementById('logoutt');
logoutt.addEventListener("click", Logout2);



//FUNÇÃO QUE AO SER CHAMADA DESLOGA O USUARIO E MANDA PARA A PAGINA DESEJADA, OU PAGINA DE LOGIN
function Logout2() {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
        window.location.href = "../../login.html" //PAGINA ESCOLHIDA AO DESLOGAR
    })
    .catch((error) => {
        alert('Falha ao deslogar')
    console.log(error);
    });
}
 