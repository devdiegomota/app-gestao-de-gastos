

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
    ValidacaoDeSenhas ()
}

function AlternButtonDisable () {
    const confirmasenha = ConfirmaSenhaValido();
    const passwordValido = isPasswordValid();
    const emailValid = isEmailValid();  

    form.RegisterButton().disabled = !passwordValido || !confirmasenha

}

function ConfirmaSenhaValido () {
    const emailValid = isEmailValid();  
    const password = form.Password().value;
    const confirmpassword = form.ConfirmPassword().value;
    if (confirmpassword == password && emailValid) {
        return true
    } else {
        return false
    }
       
}

function isPasswordValid() /*Função que verifica de tem valor no password */{
    const password = form.Password().value
    if (!password) {
        return false
    } else {
        return true
    }
}

function ValidacaoDeSenhas () {
    const password = form.Password().value;
    const confirmpassword = form.ConfirmPassword().value;
    form.ConfirmPasswordError().style.display = password == confirmpassword? "none" : "block";

}

function OnChangeConfirmPassword() {
    ValidacaoDeSenhas ()
    AlternButtonDisable ()
    
}

const form = {
    email: () => document.getElementById('email'),
    ErroEmailObrigatorio: () => document.getElementById('erro-email-obrigatorio'),
    ErroEmailInvalido: () => document.getElementById('erro-email-invalido'),
    ErroSenha: () => document.getElementById('erro-senha'),
    ButtonRecoveryP: () => document.getElementById('recover-password-b'),
    LoginButton: () => document.getElementById('login-button'),
    Password: () => document.getElementById('password'),
    RegisterButton: () => document.getElementById('register-button'),
    ConfirmPassword: () => document.getElementById('confirm-password'),
    ConfirmPasswordError: () => document.getElementById('confirm-password-error')
}

