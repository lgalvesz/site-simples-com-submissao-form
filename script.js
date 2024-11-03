function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {

        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const idade = document.getElementById('idade').value;


        localStorage.setItem('nome', nome);
        localStorage.setItem('sobrenome', sobrenome);
        localStorage.setItem('email', email);
        localStorage.setItem('idade', idade);


        window.location.href = 'confirmation.html';
    } else {
        console.log('Formulário contém erros.');
    }
}

function redirectToForm() {
    window.location.href = 'form.html';
}


function validateForm() {
    const nome = document.getElementById('nome');
    const sobrenome = document.getElementById('sobrenome');
    const email = document.getElementById('email');
    const idade = document.getElementById('idade');

    let isValid = true;


    if (nome.value.length < 3 || nome.value.length > 50) {
        showError(nome, 'O nome deve ter entre 3 e 50 caracteres.');
        isValid = false;
    } else {
        showSuccess(nome);
    }


    if (sobrenome.value.length < 3 || sobrenome.value.length > 50) {
        showError(sobrenome, 'O sobrenome deve ter entre 3 e 50 caracteres.');
        isValid = false;
    } else {
        showSuccess(sobrenome);
    }


    if (!emailRegex.test(email.value)) {
        showError(email, 'Por favor, insira um e-mail válido.');
        isValid = false;
    } else {
        showSuccess(email);
    }


    if (isNaN(idade.value) || idade.value <= 0 || idade.value >= 120) {
        showError(idade, 'A idade deve ser um número positivo menor que 120.');
        isValid = false;
    } else {
        showSuccess(idade);
    }

    return isValid;
}


function showError(input, message) {
    const campoFormulario = input.parentElement;
    const small = campoFormulario.querySelector('small');
    campoFormulario.className = 'campo-formulario error';
    small.innerText = message;
}


function showSuccess(input) {
    const campoFormulario = input.parentElement;
    const small = campoFormulario.querySelector('small');
    campoFormulario.className = 'campo-formulario success';
    small.innerText = '';
}


function loadConfirmationData() {
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    const email = localStorage.getItem('email');
    const idade = localStorage.getItem('idade');

    document.getElementById('dadosFormulario').innerHTML = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Sobrenome:</strong> ${sobrenome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Idade:</strong> ${idade}</p>
    `;
}


function confirmData() {

    localStorage.clear();
    window.location.href = 'index.html';
}


function saveDataAsJson() {

    const data = {
        nome: localStorage.getItem('nome'),
        sobrenome: localStorage.getItem('sobrenome'),
        email: localStorage.getItem('email'),
        idade: localStorage.getItem('idade')
    };


    const jsonData = JSON.stringify(data, null, 4);


    const blob = new Blob([jsonData], { type: 'application/json' });


    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados_formulario.json';


    link.click();


    URL.revokeObjectURL(url);
}


function confirmData() {

    saveDataAsJson();


    localStorage.clear();
    window.location.href = 'index.html';
}


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

