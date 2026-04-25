import {cars} from "./data.js"


const url= new URLSearchParams(window.location.search); 
const carParam= url.get('name');
const categoryParam = url.get('category');
const car= cars.find(car => car.name === carParam);

console.log(carParam);

const carDetails= document.querySelector('.car-details');

function renderDetails(car){
    const html=`
    <div class="container">
        <div class="category"><h3>${categoryParam}</h3></div>
        <div class="right-section">
            <img src="${car.image}" alt="${car.name}">
        </div>
        <div class="left-section">
            <h1>${car.name}</h1>
            <h2>${car.price}</h2>
            <p>${car.description}</p>
        </div>
        <div class="buy"><button id="buy-button">add to card</button></div>
    </div>
    `;
    carDetails.innerHTML=html;
}
// function renderSimilar(originalCar){
//     const moreCars= cars.filter(car => car.type === originalCar.type);
//     const moreContainer = document.createElement('div');
//     moreContainer.classList.add('more-cars');
//     moreContainer.innerHTML=`
//         <h2>Similar Cars</h2>
//         `;
//     const moreCarsContainer= document.createElement('div');
//     moreCarsContainer.classList.add('more-cars-container');
//     moreContainer.appendChild(moreCarsContainer);
//     moreCars.forEach(car=>{
//         const carCard= document.createElement('div');
//         carCard.classList.add('car-card');
//         carCard.innerHTML=`
//         <img src="${car.image}" alt="${car.name}">
//         <h4>${car.name}</h4>
//         <p>${car.specs}</p>
//         <p class="price">$${car.price}</p>
//         `;
//         moreCarsContainer.appendChild(carCard);
//     });
//     carDetails.appendChild(moreContainer);
// }
renderDetails(car);
// renderSimilar(car);
const button= document.getElementById('back-button');
button.addEventListener('click', () => {
    window.history.back();
});


// comments 
const form= document.querySelector('form');
const commentInput = document.getElementById("comment");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = commentInput.value;
    if(!comment) return;
    commentInput.value = '';
    const existingComments=JSON.parse(localStorage.getItem(carParam)) || [];
    existingComments.push(comment);
    localStorage.setItem(carParam, JSON.stringify(existingComments));
    showComments(); 
    console.log(comment);
    console.log(localStorage.getItem(carParam));
});

function showComments(){
    const comments = JSON.parse(localStorage.getItem(carParam)) || [];
    const commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = comment;
        commentsContainer.appendChild(commentElement);
    });
}
showComments();

const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', () => {
    const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
    inCart.push(car);
    localStorage.setItem('inCart', JSON.stringify(inCart));
    alert('Car added to cart!');
});