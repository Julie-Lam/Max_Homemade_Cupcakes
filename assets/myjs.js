console.log("test"); 

let cartBtn = document.querySelector('#cart-info'); 
let cart = document.querySelector('#cart'); 
let addToCartBtns = document.querySelectorAll('.fa-shopping-cart'); 
let counter = 0; 
let itemTotal = document.querySelector('.item-total');
let cartContainer = document.querySelector('#cart'); 
let itemCount = document.querySelector('#item-count'); 
let clearBtn = document.querySelector('#clear-cart'); 
let cartTotal = document.querySelector('#cart-total'); 


// SHOW BTN FUNCTIONALITY

cartBtn.addEventListener('click', (e) => {
    cart.classList.toggle('show-cart'); 
})
 

/* DELETE BTN FUNCTIONALITY */

document.addEventListener('click', (e) => {
    document.querySelectorAll('.fa-trash').forEach((deleteBtn, index, array) => {
        if(e.target === deleteBtn){
            // -> Removes item
           e.target.parentElement.parentElement.classList.add('set-display-none');
            
            // -> Updates total
            let cartTotal = document.querySelector('#cart-total'); 
            let deletedItemPrice = e.target.parentElement.previousElementSibling.querySelector('.cart-item-price').innerText; 
            
            cartTotal.innerText = parseFloat(cartTotal.innerText) - parseFloat(deletedItemPrice); 
            console.log(cartTotal)
            
            itemTotal.innerText = cartTotal.innerText; 
            
            // -> Updates counter
            counter--
            itemCount.innerText = counter; 
           }
    })
})

/* ADD TO CART FUNCTIONALITY */
addToCartBtns.forEach((addToCartBtn, index, array) => {
    addToCartBtn.addEventListener('click', (e) => {
        alert('Item successfully added to cart!'); 
        
        let itemName = e.target.parentElement.parentElement.nextElementSibling.querySelector('.store-item-name').innerText; 
        let itemPrice = e.target.parentElement.parentElement.nextElementSibling.querySelector('.store-item-price').innerText;
        let itemImageSrc = e.target.parentElement.previousElementSibling.getAttribute('src') 
        
        
        
        let div = document.createElement('div'); 
        div.innerHTML =         
        `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
            <img src="${itemImageSrc}" class="img-fluid rounded-circle" id="item-img" alt="" width="50px !important">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${itemName}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${itemPrice}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>`; 
        
        // -> Adds item to cart
        cartContainer.insertBefore(div, cartContainer.lastElementChild.previousElementSibling);
        
        
        // -> Increases counter     
        counter++; 
        itemCount.innerText = counter
        
         
        let allPrices = cartContainer.querySelectorAll('.cart-item-price'); 
        let totalPrice = 0; 
        
        // -> Shows total $$
        allPrices.forEach((price, index, array) => {
           totalPrice += parseFloat(price.innerHTML); 
        })
        itemTotal.innerText = totalPrice; 
        
        
        // -> Shows cart total $$
        cartTotal.innerText = totalPrice; 
    })
})

/* CLEAR BTN FUNCTIONALITY */

document.addEventListener('click', (e) => {
    if(e.target.id === 'clear-cart') {
        console.log('cleared!'); 
        itemTotal.innerText = '0'; 
        itemCount.innerText = '0'; 
        cartTotal.innerText = '0'; 
        
        let cartItems = document.querySelectorAll('.cart-item'); 
        cartItems.forEach((cartItem, index, array) => {
            cartItem.classList.add('set-display-none'); 
        }) 
    }
})




let btns = document.querySelectorAll('[data-filter]'); 
let searchFilter = document.querySelector('#search-item'); 
let deserts = document.querySelectorAll('[data-item]')

btns.forEach(function(btn, index, array) {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        let filter = e.target.dataset.filter; 
        
        deserts.forEach(function(desert, index, array) {
            if(filter === 'all') {
                desert.style.display = 'block'; 
            }
        
            else if (filter !== desert.dataset.item) {
            desert.style.display = 'none'; 
            } 
            
            else {
                desert.style.display = 'block'
            }
        })
    })
})

searchFilter.addEventListener('keyup', () => {
    let search = searchFilter.value.toLowerCase();
    deserts.forEach(function(desert, index, array) {
        if(desert.dataset.item.indexOf(search) === -1) {
            desert.style.display = 'none'; 
        }
        else if (desert.dataset.item.indexOf(search) !== 0){
            desert.style.display = 'none'
        }
        else {
            desert.style.display = 'block'; 
        }              
    })
})

