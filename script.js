// -------------------------------
// VARIABLES PLACE
// -------------------------------

// --- DOM ELEMENTS ---
const
    imageContainer = document.querySelector('.unsplash-images'),
    spinner = document.querySelector('.spinner');
  

// --- FOR THE FETCHING TASKS ---
let
    photoArray = [],
    imageContainerChildElementsCount = imageContainer.childElementCount;

// => API Key
const _0x2d4316=_0x25f1;function _0x25f1(_0x3c8211,_0x51ceaf){const _0x2516f1=_0x2516();return _0x25f1=function(_0x25f17e,_0x599826){_0x25f17e=_0x25f17e-0x138;let _0x43347a=_0x2516f1[_0x25f17e];return _0x43347a;},_0x25f1(_0x3c8211,_0x51ceaf);}(function(_0x3d4d7e,_0x2993da){const _0x1a78eb=_0x25f1,_0x29bb38=_0x3d4d7e();while(!![]){try{const _0x1966da=parseInt(_0x1a78eb(0x13f))/0x1+parseInt(_0x1a78eb(0x13b))/0x2*(parseInt(_0x1a78eb(0x139))/0x3)+parseInt(_0x1a78eb(0x13d))/0x4+-parseInt(_0x1a78eb(0x140))/0x5*(-parseInt(_0x1a78eb(0x142))/0x6)+parseInt(_0x1a78eb(0x138))/0x7+parseInt(_0x1a78eb(0x141))/0x8*(-parseInt(_0x1a78eb(0x13c))/0x9)+-parseInt(_0x1a78eb(0x13a))/0xa;if(_0x1966da===_0x2993da)break;else _0x29bb38['push'](_0x29bb38['shift']());}catch(_0x1726c0){_0x29bb38['push'](_0x29bb38['shift']());}}}(_0x2516,0x30e7e));function _0x2516(){const _0x2fb723=['438996WdVfQQ','EbjZJWCeniA36buH0PyrfXl9t8pfA2Knp-JK1GeiRO4','200057UUXSWI','1137595gZzMOF','40SEcrwY','6OoTLDx','1542457CIuWnt','4083vVQgAV','7985240ztbqmk','502tUxUUn','180801XbTVwS'];_0x2516=function(){return _0x2fb723;};return _0x2516();}const apiKey=_0x2d4316(0x13e);


// --- FOR INFINITE ACTION ---
const windowHeight = window.innerHeight;

let
    allNewImages = 0,
    newImagesLoaded = 0,
    allNewImagesAreLoaded = false;



// -------------------------------
// CALLBACK FUNCTIONS
// -------------------------------

const imageLoaded = ()=>{
    newImagesLoaded++;

    if(newImagesLoaded === allNewImages){
        allNewImagesAreLoaded = true;
        spinner.hidden = true;

        imageContainerChildElementsCount = imageContainer.childElementCount;
    }
}

const setAttributes = (element, attributes)=>{
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

const displayPhotos = async(response)=>{
    photoArray = await response.json();
    // console.log('photo array =>', photoArray);
    // console.log('photo =>', photoArray[0]);

    // => reset some variables => it`s another fetching round
    newImagesLoaded = 0;
    allNewImages = photoArray.length;

    photoArray.forEach(photo =>{

        // => create an anchor element with attributes
        const anchorElement = document.createElement('a');
        setAttributes(anchorElement, {
            href: photo.links.html,
            target: '_blank',
            title: photo.links.html,
        });

        // => create an img
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description
        });

        // => count loaded image / control the state of the current fetching round
        img.addEventListener('loaded', imageLoaded());

        // => built the full anchor and put it in the dom
        anchorElement.appendChild(img);
        imageContainer.appendChild(anchorElement);

    });
    
}

const throwError = (response)=>{
    throw new Error(
        `Failed to fetch data!
         STATUSCODE : ${response.status}
         STATUSTEXT: ${response.statusText}
        `);
}



// -------------------------------
// Fetching Zone
// -------------------------------

const getPhotos = async()=>{
    console.log('child elements count of image container', imageContainerChildElementsCount);

    let apiUrl = 
        imageContainerChildElementsCount < 1 
        ? `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=5`
        : `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=20`;

    try{
        const response = await fetch(apiUrl);
        // console.log(response);

        response.ok
        ? displayPhotos(response)
        : throwError(response);

    }
    catch(err){
        imageContainer.innerHTML = `
            <p>${err}</p>
        `
    }
}

getPhotos();



// -------------------------------
// Events
// -------------------------------

window.addEventListener('scroll', ()=>{
    // console.log('window inner height => \n', windowHeight);
    // console.log('scroll y => \n', window.scrollY);
    // console.log('body offset height => \n', document.body.offsetHeight);

    if(windowHeight + window.scrollY >= document.body.offsetHeight - windowHeight * 0.5 && allNewImagesAreLoaded){
        allNewImagesAreLoaded = false;
        getPhotos();
        console.log('bigger');
        console.log('scroll y => \n', window.scrollY);
        console.log('body offset height => \n', document.body.offsetHeight);
    }
})