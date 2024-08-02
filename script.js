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
