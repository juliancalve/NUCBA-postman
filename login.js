const baseURL = 'https://back-sandbox.herokuapp.com/api';

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#submit');

const login = async () => {

    const body = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const json = await response.json();

        console.log(json);
    } catch( error ) {
        alert('ERROR', error);
    }
}


submitButton.addEventListener('click', login);