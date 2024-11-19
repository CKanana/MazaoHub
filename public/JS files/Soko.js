document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('#cartbtn'); 
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }
});

function addToCart(event) {
    alert('you clicked');
    const productCard = event.target.closest('.card');  
    const productId = productCard.dataset.productId;
    const productName = productCard.querySelector('.card-title').innerText;
    const productPrice = productCard.querySelector('.price').innerText.replace('Ksh ', '').trim();
    const productImage = productCard.querySelector('img').src;

    console.log(productId, productName, productPrice, productImage); 

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} has been added to your cart!`);
}