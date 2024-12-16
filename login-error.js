function OnInputEmail() /* Função que chamada valida email e ativa o botão recuperar senha*/{
    AlternButtonDisable();
    AlternErrorEmail();
}

function OnInputSenha() {
    AlternButtonDisable();
    PasswordError();
}

function isEmailValid() /* Funçao se tiver valor no email ele chama a ValidarEmail*/  { 
    const email = form.email().value
    if (!email) {
        return false;
    } else {
        return ValidarEmail(email) //chama a validação se tiver valor
    }
}

function AlternErrorEmail() {
    const email = form.email().value;
    form.ErroEmailObrigatorio().style.display = email ? "none" : "block";

    form.ErroEmailInvalido().style.display = (ValidarEmail(email)) ? "none" : "block";

}

function PasswordError () {
    const password = form.Password().value
    form.ErroSenha().style.display = password ? "none" : "block";
}

function AlternButtonDisable () {

    const emailValid = isEmailValid();
    form.ButtonRecoveryP().disabled = !emailValid /* Mantem desabilitado se falso emailValid*/

const passwordValid = isPasswordValid();
    form.LoginButton().disabled = !emailValid || !passwordValid; /* Mantem desabilitado se falso emailValid e passwordValid*/

}

function isPasswordValid() /*Função que verifica de tem valor no password */{
    const password = form.Password().value
    if (!password) {
        return false
    } else {
        return true
    }
}

const form = {
    email: () => document.getElementById('email'),
    ErroEmailObrigatorio: () => document.getElementById('erro-email-obrigatorio'),
    ErroEmailInvalido: () => document.getElementById('erro-email-invalido'),
    ErroSenha: () => document.getElementById('erro-senha'),
    ButtonRecoveryP: () => document.getElementById('recover-password-b'),
    LoginButton: () => document.getElementById('login-button'),
    Password: () => document.getElementById('password'),
    
}

