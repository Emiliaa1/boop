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

cart.addEventListener('click',()=>{
    cartPage.classList.add('active');
})

crossCart.addEventListener('click',()=>{
    cartPage.classList.remove('active');
})


let http = new XMLHttpRequest();
http.open('get','yarns.json',true);
http.send();


let i = 0;
let v = [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve or initialize cartItems
var n = cartItems.length; // Initialize n based on the saved cart items
let cartOutput = ""; // To hold the cart HTML

http.onload = function() {
    if (this.readyState == 4 && this.status == 200) {

        const addToCartButtons = document.querySelectorAll('.buttonItem');

        // Restore the cart items on page load
        cartItems.forEach(item => {
            cartOutput += `
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.image}">
                    <p class="nameC">${item.name}</p>
                    <p class="priceC">
                        <span>${item.price}</span>
                        <span>&euro;</span> 
                    </p>
                </div>
            `;
        });
        document.querySelector(".loadItems").innerHTML = cartOutput;
    }
}

