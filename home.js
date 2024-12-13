import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, query, where, collection, getDocs, deleteDoc, doc, orderBy, getAggregateFromServer, sum} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

UserLoged()// CHAMA A FUNÇÃO QUE VERIFICA SE TA LOGADO
CalculaReceitas()// CHAMA A FUNÇÃO QUE JA MOSTRA AS RECEITAS NO PAINEL
CalculadDespesas()// CHAMA A FUNÇÃO QUE JA MOSTRA AS DESPESAS NO PAINEL

//FUNÇÃO QUE CALCULA AS RECEITAS-----------------------------------------------------
async function CalculaReceitas() {
    const coll = collection(db, 'transaction');
    const q = query(coll, where('tipo', '==', 'recebidos'));
    const snapshot = await getAggregateFromServer(q, {
        total: sum('money.valor')
    });

    console.log('Receitas: ', snapshot.data().total);
    const receitas = document.getElementById('receitas')
    receitas.innerHTML = `R$${snapshot.data().total}`

}
//------------------------------------------------------------
//FUNÇÃO QUE CALCULA AS DESPESAS-----------------------------------------------------
async function CalculadDespesas() {
    const coll = collection(db, 'transaction');
    const q = query(coll, where('tipo', '==', 'gastos'));
    const snapshot = await getAggregateFromServer(q, {
        total: sum('money.valor')
    });

    console.log('Despesas: ', snapshot.data().total);
    const despesas = document.getElementById('despesas')
    despesas.innerHTML = `R$${snapshot.data().total}`
}
//------------------------------------------------------------

//VERIFICA SE O USUARIO TA LOGADO-----------------------------------------------------
function UserLoged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            ProcuraTransacoes(user);//Inicia na tela as transações

        }
    });
}
//-----------------------------------------------------------------

//CHAMA O BOTAO DESLOGAR E MONITORA OS CLIQUES NELE PARA CHAMAR FUNCAO
const logoutbutton = document.getElementById('logout-button')
logoutbutton.addEventListener("click", function () {

    Logout();

});
//FUNÇÃO QUE AO SER CHAMADA DESLOGA O USUARIO E MANDA PARA A PAGINA DESEJADA, OU PAGINA DE LOGIN
function Logout() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            window.location.href = "login.html" //PAGINA ESCOLHIDA AO DESLOGAR
        })
        .catch((error) => {
            alert('Falha ao deslogar')
            console.log(error);
        });
}
//-------------------------------------------------------------------

//CHAMA O BOTAO ADD TRANSAÇÕES E MONITORA OS CLIQUES NELE PARA CHAMAR FUNCAO------------------------
const adtransacoes = document.getElementById('botao-flutuante')
adtransacoes.addEventListener("click", function () {

    AddTransacoes();

});

function AddTransacoes() {
    window.location.href = "pages/transacoes/transacoes.html"
}

//------------------------------------------------------------------------------

//FUNÇÃO QUE PEGA OS DADOS NO FIRESTORE-------------------------------------------------
async function ProcuraTransacoes(user) {
    //ShowLoading()

    const q = query(collection(db, "transaction"), where("user.uid", "==", user.uid), orderBy("data", "desc"));//seleciona a coleção transaction e filtra com base na condição do where ordena por data decressente

    const querySnapshot = await getDocs(q);//chama a coleção 'q' selecionada acima

    const transactions = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
    }));

    console.log(transactions)

    AddTransacoesNaTela(transactions);//coloca essa arwey criada na função que joga na tela
}

//----------------------------------------------------//---------------------------------

//CRIA OS ELEMENTOS NA TELA EM FORMA DE LISTA ORDENADA CONTENDO 4 PARAFRAFOS ONDE CADA UM RECEBE OBJETOS DO BANCO------------------------

function AddTransacoesNaTela(transactions) {
    const listaordenada = document.getElementById('transaction')

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.tipo);
        li.id = transaction.uid; //adiciona o uid de cada transação como id de cada lista
        li.addEventListener("click", () => {
            window.location.href = "pages/transacoes/transacoes.html?uid=" + transaction.uid;
        })
        //criando o botão remover transação na tela
        const BotaoDelete = document.createElement('button')
        BotaoDelete.innerHTML = "Remover"
        BotaoDelete.classList.add('botao-remover-home')
        BotaoDelete.addEventListener('click', event => {
            event.stopPropagation();
            ConfirmRemover(transaction)
        })
        li.appendChild(BotaoDelete)
        //botão criado----------------
        const data = document.createElement('p');
        data.innerHTML = FormatDate(transaction.data)
        li.appendChild(data)

        const money = document.createElement('p')
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const tipotransacao = document.createElement('p');
        tipotransacao.innerHTML = transaction.tipoTransacao;
        li.appendChild(tipotransacao);

        if (transaction.description) {
            const descricao = document.createElement('p');
            descricao.innerHTML = transaction.description;
            li.appendChild(descricao);
        }

        listaordenada.appendChild(li);
    });
}
//-----------------------------------------------------------------------------------------
//FUNÇÃO QUE REMOVE A TRANSAÇÃO PELO BOTÃO
//etapa de confirmação antes de deletar
function ConfirmRemover(transaction) {
    const deveriaremover = confirm('Deseja remover a transação?')
    console.log(deveriaremover)
    if (deveriaremover) {
        RemovaTransacao(transaction)
    }
}
//remove direto do firestore e da tela
async function RemovaTransacao(transaction) {
    await deleteDoc(doc(db, "transaction", transaction.uid));
    document.getElementById(transaction.uid).remove();
}

//------------------------------------//-------------------------------------------------------//

//RETORNA DOIS SUBOBJETOS NO OBJETO MONEY.
function formatMoney(money) {
    return `${money.currency} ${money.valor}`
}
//FORMATA DATA PARA PADRAO DO BRAZIL
function FormatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}
