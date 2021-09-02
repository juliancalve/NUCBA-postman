const getUserInfo = async () => {

    try{
        const response = await fetch('https://back-sandbox.herokuapp.com/api/user', {
            method: 'GET',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDE0YTc2ZDk5YmM3MDM5NDU1OGU1OCIsImlhdCI6MTYzMDU1MDI4OH0.APYZUEhrg1OQeXcsOzWdEeqMpwkvIJ5yBqPe0IzI378"
            }
        });

        const json = await response.json();
        console.log(json);
    } catch( error ) {
        alert('error')
    }
}

getUserInfo();