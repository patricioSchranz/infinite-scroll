// -------------------------------
// DOM ELEMENTS
// -------------------------------

const
    imageContainer = document.querySelector('.unsplash-images'),
    spinner = document.querySelector('.spinner');



// -------------------------------
// Fetching Zone
// -------------------------------

const
    count = 10,
    apiKey = 'EbjZJWCeniA36buH0PyrfXl9t8pfA2Knp-JK1GeiRO4',
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const getPhotos = async()=>{
    try{
        const response = await fetch(apiUrl);
        console.log(response);

    }
    catch(err){

    }
}

getPhotos();