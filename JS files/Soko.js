const addToCartButtons = document.querySelectorAll('cartbtn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});



// Function to add the product to the cart
function addToCart(event) {
const productCard = event.target.closest('.card');  
const productId = productCard.dataset.productId;
const productName = productCard.querySelector('.card-title').innerText;
const productPrice = productCard.querySelector('.price').innerText.replace('Ksh ', '').trim();
const productImage = productCard.querySelector('img').src;
}