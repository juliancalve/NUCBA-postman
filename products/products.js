const baseURL = 'https://back-sandbox.herokuapp.com/api/products';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDE0YTc2ZDk5YmM3MDM5NDU1OGU1OCIsImlhdCI6MTYzMDYyMzU3Nn0.g_khja2VvwDwXlCO0r_ovnsmfY-HfXI7ZOUFWe83338';

const productContainer = document.querySelector('#product-container');

const nameInput = document.querySelector('#productName');
const priceInput = document.querySelector('#productPrice');
const createProductButton = document.querySelector('#createProduct');

const renderProducts = (products) => {

    products.forEach(element => {
        const h5 = document.createElement('h5');
        h5.innerText = element.name;

        const b = document.createElement('b');
        b.innerText = `$ ${element.price}`;

        const div = document.createElement('div');
        div.className = 'product'
        div.appendChild(h5);
        div.appendChild(b);

        productContainer.appendChild(div);
    });
}

const getProducts = async () => {
    // Con esto limpiamos el contenido del productContainer, para que cada vez que pidamos
    // los productos, estos no se dupliquen y solo tengamos los que nos da el back
    productContainer.innerHTML = null;
    try{
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        const json = await response.json();
        const data = json.data.data;

        renderProducts(data);

    } catch( error ) {
        alert( 'error el obtener ' + error );
    }
}

getProducts();

// createProduct va a crear el producto, que vamos a ingresar en el formulario
// vamos a usar un post, tenemos que declarar los headers (Content-Type) cada vez que enviemos un body
// Tambien el Authorization Bearer 'token' para que el backend nos deje interactuar

// Al momento de escribir un objeto, en el nombre de la propiedad, por ejemplo (name), si ya existe un dato
// con ese identificador, no es necesario hacer .. { name: name } porque para js es redundante y podemos
// poner { name }
const createProduct = async () => {
    const name = nameInput.value;
    const price = priceInput.value;

    const body = JSON.stringify({
        name: name,
        price
    });
// Si falla cae en el catch, sino sigue dentro del try
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body
        });
        console.log('esto es la respuesta', response);
        // Comparamos el status code de la respuesta del back ( esto solo podemos verlo antes de hacer el .json())
        // si es distinto de 201 (creado exitosamente) generamos un nuevo error, con el mensaje que queramos
        // esto va a hacer que se dispare el catch y nuestro mensaje caiga en 'error' del parametro del catch
        if(response.status !== 201){
            throw new Error('Che, el salame del back, se olvido asi que lo manejo asi');
        } else {
            nameInput.value = null;
            priceInput.value = null;
            getProducts();
        }

        
    } catch( error ) {
        alert('error al crear ' + error);
    }

}

createProductButton.addEventListener('click', createProduct);