const offScreenMenu = document.querySelector('.off-screen-menu');
const menu = document.querySelector('#menu');
const cross = document.querySelector('#cross')

menu.addEventListener('click', ()=> {
    offScreenMenu.classList.toggle('active');
})

cross.addEventListener('click',()=>{
    offScreenMenu.classList.toggle('active');
})