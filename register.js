

const baseURL = 'https://back-sandbox.herokuapp.com/api';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');
const photoInput = document.getElementById('photo');
const submitButton = document.getElementById('submit');

// convertir una img en base64 ( string larguisimo), para enviarlo al back, y eso que se guarde en la db
// Y asi, cuando nosotros pidamos la info de nuestro usuario, nos envie el base64 de la img y podamos
// ponerlo en un <img src= para mostrarlo.
const toBase64 = () => {
    return new Promise((resolve, reject) => {
        const file = photoInput.files[0];
        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          resolve(reader.result);
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
            resolve('');
        }
    })

  }

const register = async () => {
    const payload = {
        email: emailInput.value,
        password: passwordInput.value,
        name: nameInput.value,
        lastName: lastNameInput.value,
        age: Number(ageInput.value),
        photo: await toBase64()
    };

    try{
        const response = await fetch(baseURL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const json = await response.json();
        console.log(json);
    } catch( error ) {
        alert('che error', error);
    }
}

submitButton.addEventListener('click', register);