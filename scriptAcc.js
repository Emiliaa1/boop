const offScreenMenu = document.querySelector('.off-screen-menu');
const menu = document.querySelector('#menu');
const cross = document.querySelector('#cross')
const overlay = document.querySelector('.dark-filter');

menu.addEventListener('click', ()=> {
    offScreenMenu.classList.add('active');
    overlay.classList.add('active');
})

cross.addEventListener('click',()=>{
    offScreenMenu.classList.remove('active');
    overlay.classList.remove('active');
})

const search = document.querySelector('#search');
const searchBar = document.querySelector('.search-bar');
const crossSearch = document.querySelector('#cross-search');

search.addEventListener('click',()=>{
    searchBar.classList.add('active');
})

crossSearch.addEventListener('click',()=>{
    searchBar.classList.remove('active');
})

const cart = document.querySelector('#cart');
const cartPage = document.querySelector('.pop-up');
const crossCart = document.querySelector('#cross-cart');
const overlayp = document.querySelector('.dark-filterp');

cart.addEventListener('click',()=>{
    cartPage.classList.add('active');
    overlayp.classList.add('active');
})

crossCart.addEventListener('click',()=>{
    cartPage.classList.remove('active');
    overlayp.classList.remove('active');
})

//Create an XMLHttpRequest object
let http = new XMLHttpRequest();
http.open('get', 'acc.json', true);
http.send();

let i = 0;
let v = [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve or initialize cartItems
let cartOutput = ""; // To hold the cart HTML
let total = JSON.parse(localStorage.getItem('total')) || 0;

http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);
        let output = "";

        for (let item of products) {
            output += `
                <div class="product">
                    <img src="${item.image}" alt="${item.image}">
                    <p class="name">${item.name}</p>
                    <p class="price">
                        <span>${item.price}</span>
                        <span>&euro;</span>
                    </p>
                    <button class="buttonItem" id="${i}">Add to cart</button>
                </div>
            `;
            v[i] = item;
            i++;
        }

        document.querySelector(".products").innerHTML = output;
        const addToCartButtons = document.querySelectorAll('.buttonItem');

        // Restore the cart items on page load
        renderCart();

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                let newItem = v[button.id];
                let existingItem = cartItems.find(item => item.name === newItem.name);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    newItem.quantity = 1;
                    cartItems.push(newItem);
                }
                total+=newItem.price;
                renderCart();
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                localStorage.setItem('total',JSON.stringify(total));
            });
        });
    }
};

// Function to render the cart items with plus and minus buttons
function renderCart() {
    cartOutput = "";
    cartItems.forEach((item, index) => {
        cartOutput += `
            <div class="cart-product" data-index="${index}">
                <img src="${item.image}" alt="${item.image}">
                <p class="nameC">${item.name}</p>
                <p class="priceC">
                    <span>${item.price}</span>
                    <span>&euro;</span> 
                </p>
                <div class="quantity-controls">
                    <button class="minus-button" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="plus-button" data-index="${index}">+</button>
                </div>
            </div>
        `;
    });
    document.querySelector(".loadItems").innerHTML = cartOutput;
    document.querySelector(".total-price").innerHTML = total;

    const plusButtons = document.querySelectorAll('.plus-button');
    const minusButtons = document.querySelectorAll('.minus-button');

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            cartItems[index].quantity += 1;
            total+=cartItems[index].price;
            renderCart();
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('total', JSON.stringify(total));
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                total-=cartItems[index].price;
            } else {
                total-=cartItems[index].price;
                cartItems.splice(index, 1);
            }
            renderCart();
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('total', JSON.stringify(total));
        });
    });

    const emptyButton = document.querySelector('#empty-cart');

     emptyButton.addEventListener('click', () => {
        cartItems = [];
        total = 0;
        renderCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('total', JSON.stringify(total));
    });
}

//Clears cart (for debugging or reset purposes)
//localStorage.removeItem('cartItems');
