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

//CHAMA O BOTAO DESLOGAR E MONITORA OS CLIQUES NELE PARA CHAMAR FUNCAO-------------------------------
const logoutt = document.getElementById('logout-button-2');
if (logoutt) {//usando if para verificar o elemento para não dar erro de TypeError
    logoutt.addEventListener("click", Logout2);
}
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
//---------------------------------------------------
}
//SEÇÃO DATA AO IPUTAR DATAS ELE FAZ A VALIDAÇÃO------------------------
const campodata = document.getElementById('data')
if (campodata) {
 campodata.addEventListener("input", OnchangeDate);
}
//FUNÇÃO QUE FAZ A VALIDAÇÃO
function OnchangeDate() {
    const data = form.data().value;
    form.dataObrigatorio().style.display = !data ? "block" : "none";

    BotaoSalvarDesabilitar()
}
//------------------------
//SEÇÃO VALOR AO IPUTAR VALOR ELE FAZ A VALIDAÇÃO------------------------
const Campovalor = document.getElementById('valor')
if (Campovalor) { 
Campovalor.addEventListener("input", OnchangeValor);
}
//FUNÇÃO DE VALIDAÇÃO
function OnchangeValor() {
    const valor = form.valor().value;
    form.ErroValorObrigatorio().style.display = !valor ? "block" : "none";
    form.ErroValorMaiorQueZero().style.display = valor <= 0 ? "block" : "none";

    BotaoSalvarDesabilitar()
}
//----------------------------------------------------------------------
//SEÇÃO TIPO TRANSAÇÃO
const campoTipoTransacao = document.getElementById('tipo-transacao');
if (campoTipoTransacao) { 
campoTipoTransacao.addEventListener("input", OnchangeTransactionTipo)
}
function OnchangeTransactionTipo() {
    const tipoTransação = form.tipoTransacao().value;
    form.ErroTipoTransacao().style.display = !tipoTransação ? "block" : "none";

    BotaoSalvarDesabilitar()
}
//------------------------------
//SEÇÃO DE VALIDAÇÃO PARA HABILITAR O BOTÃO SALVAR----------------------------------
function BotaoSalvarDesabilitar() {
    form.botaoSalvar().disabled = !FormularioValido();
}
function FormularioValido() {
    const data = form.data().value;
    if(!data) {
        return false
    }
    const valor = form.valor().value;
    if (!valor || valor <= 0) {
        return false
    }
    const tipotransacao = form.tipoTransacao().value;
    if (!tipotransacao) {
        return false
    }
    return true
}
//------------------------------------------
//ELEMENTOS EM FORMA DE OBJETOS
const form = {
    data: () => document.getElementById('data'),
    dataObrigatorio: () => document.getElementById('erro-data-obrigatorio'),
    valor: () => document.getElementById('valor'),
    ErroValorObrigatorio: () => document.getElementById('erro-valor-obrigatorio'),
    ErroValorMaiorQueZero: () => document.getElementById('erro-valor-maior-zero'),
    ErroTipoTransacao: () => document.getElementById('erro-tipo-transacao-obrigatorio'),
    tipoTransacao: () => document.getElementById('tipo-transacao'),
    botaoSalvar: () => document.getElementById('botao-salvar')
}