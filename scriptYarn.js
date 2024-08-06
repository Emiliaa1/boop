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


//Create an  xmlhttp-request object

let http = new XMLHttpRequest();
http.open('get','yarns.json',true);
http.send();

http.onload = function(){
    if(this.readyState == 4 && this.status == 200){

        let products = JSON.parse(this.responseText);
        let output = "";

        for(let item of products){
            output+=`
                <div class = "product">
                    <img src="${item.image}" alt="${item.image}">
                    <p class="name">${item.name}</p>
                    <p class="price">
                        <span>${item.price}</span>
                        <span>&euro;</span>
                    </p>
                </div>
            `;
        }

        document.querySelector(".products").innerHTML = output;

    }
}