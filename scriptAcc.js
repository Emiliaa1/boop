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


//Create an  xmlhttp-request object

let http = new XMLHttpRequest();
http.open('get','acc.json',true);
http.send();

let i = 0;
let v = [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve or initialize cartItems
var n = cartItems.length; // Initialize n based on the saved cart items
let cartOutput = ""; // To hold the cart HTML

http.onload = function() {
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

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                let newItem = v[button.id];
                cartItems.push(newItem); // Add new item to the cartItems array
                n++; // Increment n after adding an item to cartItems

                cartOutput += `
                    <div class="cart-product">
                        <img src="${newItem.image}" alt="${newItem.image}">
                        <p class="nameC">${newItem.name}</p>
                        <p class="priceC">
                            <span>${newItem.price}</span>
                            <span>&euro;</span> 
                        </p>
                    </div>
                `;
                document.querySelector(".loadItems").innerHTML = cartOutput;

                // Save the updated cartItems array to localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                console.log('Number of items in cart:', n);
                console.log('Current cart items:', cartItems);
            });
        });
    }
}

//Clears cart
localStorage.removeItem('cartItems');