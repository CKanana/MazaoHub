var addCartBut = document.getElementsByClassName('add-to-cart');

function ready() {
    for (var i = 0; i < addCartBut.length; i++) {
        var button = addCartBut[i];
        button.addEventListener('click', AddToCart);
    }
}

if (typeof window.cartItemCount === 'undefined') {
    window.cartItemCount = 0;
}

function AddToCart(event) {
    var button = event.target;
    if (!button.classList.contains('add-to-cart')) {
        console.error('Add to cart button not clicked');
        return;
    }

    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('card-title')[0].innerText;
    var priceText = shopItem.getElementsByClassName('price')[0].innerText;
    var price = parseFloat(priceText.replace(/[^\d.-]/g, ''));

    // Check for existing items in localStorage
    let index = 0;
    let itemExists = false;

    while (localStorage.getItem(`title${index}`)) {
        if (localStorage.getItem(`title${index}`) === title) {
            itemExists = true;
            break;
        }
        index++;
    }

    // If the item is already in the cart, show an alert and exit the function
    if (itemExists) {
        alert('This item is already in the cart');
        return;
    }
    localStorage.setItem(`title${index}`, title);
    localStorage.setItem(`price${index}`, price);
    localStorage.setItem(`quantity${index}`, 1);

    window.cartItemCount++;
    alert(`${title} has been added to cart`);
}



if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
