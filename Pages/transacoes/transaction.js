import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, addDoc, setDoc, query, where, collection, getDoc, getDocs, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBdwnBgSGDXFw7LKhOWZcC7qucnYI0KbVE",
    authDomain: "controle-de-gastos-83eb5.firebaseapp.com",
    projectId: "controle-de-gastos-83eb5",
    storageBucket: "controle-de-gastos-83eb5.appspot.com",
    messagingSenderId: "672245601640",
    appId: "1:672245601640:web:4f17d445b38d4a49a7b2dd"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//------------------------------------------------------------------
UserLoged()// CHAMA A FUNÇÃO QUE VERIFICA SE TA LOGADO
//VERIFICA SE O USUARIO TA LOGADO-----------------------------------------------------
function UserLoged () {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        return true
    
      }
    });
}
//-----------------------------------------------------------------

//AO CARREGAR O ELEMENTO BOTAO SALVAR CHAMA A FUNÇÃO QUE QUISER
const ExecutaOnload = document.getElementById('botao-salvar')
if (ExecutaOnload) {
    ExecutaOnload.onload = NaoEhNovaTransacao();
}
//Função chamada ao carregar o botão
function NaoEhNovaTransacao() {

    if (!ehNovaTransacao()) {
        const uid = PegarUIDtransacao();
        pegarTransacaoPorID(uid);
    }
}
///--------------------------------------------------------------------------


//FUNÇÃO QUE PEGA O UID DA URL DA PÁGINA---------------------------
function PegarUIDtransacao() {
    const ParametroURL = new URLSearchParams(window.location.search);

    return ParametroURL.get('uid')
}
//---------------------------------------
//VERIFICAR SE TEM ID E RETORNA SIM OU NAO-----------
function ehNovaTransacao() {
    return PegarUIDtransacao ? false : true;
}
//-----------------------------------------------------------------------------------------------

//AO CLICAR NAS TRANSAÇÕES OU NO BOTAO ADD TRANSAÇÃO ELE PEGA O ID DE ACORDO COM A OPÇÃO SELECIONADA
async function pegarTransacaoPorID(uid) {
    //ShowLoading()
    var string = uid + ''
    const docref = doc(db, "transaction", string);

    const docSnapshot = await getDoc(docref);
    if (string.length < 20 && string.length > 5) {

        console.log('Esse documento não existe')
        window.location.href = "../../home.html"
    }
    else if (!uid) {
        console.log('Adicionar novo documento')
    }
    else {
        PreencherDadosNaTela(docSnapshot.data())
        BotaoSalvarDesabilitar()

        console.log('Editar documento selecionado')
    }
}

function PreencherDadosNaTela(transaction) {
    if (transaction.tipo == "gastos") {
        form.tipoGasto().checked = true;
    } else {
        form.tipoRecebido().checked = true;
    }
    form.data().value = transaction.data;
    form.currency().value = transaction.money.currency;
    form.valor().value = transaction.money.valor;
    form.tipoTransacao().value = transaction.tipoTransacao;

    if (transaction.description){
        form.description().value = transaction.description;
    }

}
//-------------------------------------------------------------------------------------------------

//SEÇÃO QUE AO CLICAR EM SALVAR CHAMA A FUNÇÃO QUE CONTÉM OS DADOS DIGITADOS
const botaoSalvar = document.getElementById('botao-salvar')
if (botaoSalvar) {
    botaoSalvar.addEventListener("click", SalvarTransacao)
}
//----------------------------------
//SE FOR NOVA TRANSAÇÃO ELE SALVA SE FOR UMA EXISTENTE ELE ATUALIZA------------------------
function SalvarTransacao() {
   
if (!PegarUIDtransacao()){
    Salvar()
}  else {
    update();
} 
//----------------------------------------------------------------
//FUNÇÃO QUE ATUALIZA SE FOR SELECIONADA UMA TRANSAÇÃO EXISTENTE------------------------
async function update(){
    var uid = PegarUIDtransacao()
    var string = uid + ''
    const atualizar = doc(db, "transaction", string);

    await updateDoc(atualizar, {
     
            tipo: form.tipoGasto().checked ? "gastos" : "recebidos",
            data: form.data().value,
            money: {
                 currency: form.currency().value,
                 valor: parseFloat(form.valor().value)
            },
            tipoTransacao: form.tipoTransacao().value,
            description: form.description().value,
});
location.href = "../../home.html"
}
//----------------------------------------------------------------------------------
//FUNÇÃO QUE SALVA SE IDENTIFICAR NOVA TRANSAÇÃO NA OUTRA FUNÇÃO------------------
function Salvar(){

 //ShowLoading()
 const auth = getAuth();
 onAuthStateChanged(auth, (user) => {
     if (user) {

         const uid = user.uid;
         const Dados = addDoc(collection(db, "transaction"), {

             tipo: form.tipoGasto().checked ? "gastos" : "recebidos",
             data: form.data().value,
             money: {
                 currency: form.currency().value,
                 valor: parseFloat(form.valor().value)
             },
             tipoTransacao: form.tipoTransacao().value,
             description: form.description().value,
             user: {
                 uid: uid
             }
         })

         console.log("Document written with ID: ", Dados.id)
     }
 })
 //PÁGINA DESTINO APÓS O ENVIO
 setTimeout(() => location.href = "../../home.html", 2000);
}}

//--------------------------------------------------------------------------------------------------

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
}
//------------------------------------------------------------------------------------

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
    if (!data) {
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
//-----------------------------------------------------------------------------
/*FORMATA DATA PARA PADRAO DO BRAZIL
function FormatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}
*/

//ELEMENTOS EM FORMA DE OBJETOS-------------------------------------------------
const form = {
    data: () => document.getElementById('data'),
    description: () => document.getElementById('description'),
    currency: () => document.getElementById('currency'),
    dataObrigatorio: () => document.getElementById('erro-data-obrigatorio'),
    valor: () => document.getElementById('valor'),
    ErroValorObrigatorio: () => document.getElementById('erro-valor-obrigatorio'),
    ErroValorMaiorQueZero: () => document.getElementById('erro-valor-maior-zero'),
    ErroTipoTransacao: () => document.getElementById('erro-tipo-transacao-obrigatorio'),
    tipoTransacao: () => document.getElementById('tipo-transacao'),
    botaoSalvar: () => document.getElementById('botao-salvar'),
    tipoGasto: () => document.getElementById('radio-gastos'),
    tipoRecebido: () => document.getElementById('radio-recebidos')
}