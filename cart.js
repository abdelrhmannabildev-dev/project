const container = document.querySelector('.container');

const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
container.appendChild(cartContainer);

let carsInCart = JSON.parse(localStorage.getItem('inCart')) || [];


function displayCart() {
cartContainer.innerHTML = "";

carsInCart.forEach((car, index) => {
    const carCard = document.createElement('div');
    carCard.classList.add('car-card');

    carCard.innerHTML = `
    <button class="remove-button">Remove</button>
    <img src="${car.image}" alt="${car.name}">
    <h4>${car.name}</h4>
    <p>${car.specs}</p>
    <p class="price">$${car.price}</p>
    `;

    const removeBtn = carCard.querySelector('.remove-button');

    removeBtn.addEventListener('click', () => {
    carsInCart.splice(index, 1);
    localStorage.setItem('inCart', JSON.stringify(carsInCart));
    displayCart();
    });

    cartContainer.appendChild(carCard);
});
}

displayCart();