import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
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
const logoutbutton = document.getElementById('logout-button')
logoutbutton.addEventListener("click", function() {
    
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

ProcuraTransacoes();

function ProcuraTransacoes () {
    setTimeout(() => {
        AddTransacoesNaTela(TransacaoFalsa);
    }, 1000)
}

function AddTransacoesNaTela(transactions) {
const listaordenada = document.getElementById('transaction')

transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add(transaction.tipo);

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

function formatMoney(money){
    return `${money.currency} ${money.valor}`
}
//FORMATA DATA PARA PADRAO DO BRAZIL
function FormatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}
//SIMULANDO DADOS DO BANCO DE DADOS
const TransacaoFalsa = [{
    tipo: 'gastos',
    data: '2024-10-15',
    money: {
        currency: 'R$',
        valor: '10,00'
    },
    tipoTransacao: 'Mercado'
}, {
    tipo: 'recebidos',
    data: '2024-10-15',
    money: {
        currency: 'R$',
        valor: '1000,00'
    },
    tipoTransacao: 'Salario',
    description: 'Ateky'

}, {
    tipo: 'gastos',
    data: '2024-10-15',
    money: {
        currency: 'R$',
        valor: '10,00'
    },
    tipoTransacao: 'Transporte',
    description: 'Uber'
}, {
    tipo: 'gastos',
    data: '2024-10-15',
    money: {
        currency: 'R$',
        valor: '600,00'
    },
    tipoTransacao: 'Aluguel',
    description: 'Bruna'

}, ]