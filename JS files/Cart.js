
window.cartItemCount = 0;

function ready() {
    shoNone();
    loadCartItems();
    updateCartMessage();
    UpdateTotal();

    const addCartButtons = document.getElementsByClassName('shop-item');
    for (let i = 0; i < addCartButtons.length; i++) {
        addCartButtons[i].addEventListener('click', AddToCart);
    }

    const purchaseButton = document.getElementsByClassName('Checkout-btn')[0];
    purchaseButton.addEventListener('click', completePurchase);

    const removeItemButtons = document.getElementsByClassName('btn-danger');
for (let i = 0; i < removeItemButtons.length; i++) {
    removeItemButtons[i].addEventListener('click', removeItem);
}

const quantInput = document.getElementsByClassName('cart-quantity-input');
for (let i = 0; i < quantInput.length; i++) {
    quantInput[i].addEventListener('input', changedQuant);
}

}

function updateCartMessage() {
    const cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const contentSection = document.getElementsByClassName('content-section')[0];

    if (cartRows.length === 0) {
        emptyCartMessage.style.display = 'block';
        contentSection.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        contentSection.style.display = 'block';
    }
}

function loadCartItems() {
    let index = 0;
    while (localStorage.getItem(`title${index}`)) {
        const title = localStorage.getItem(`title${index}`);
        const price = parseFloat(localStorage.getItem(`price${index}`));
        const quantity = parseInt(localStorage.getItem(`quantity${index}`)) || 1;

        addItemCart(title, price, quantity);
        index++;
    }
}

function addItemCart(title, price, quantity) {
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already in the cart');
            return;
        }
    }

    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">Ksh ${parseFloat(price).toFixed(2)}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantity}" min="1">
            <button class="btn-danger" type="button">REMOVE</button>
        </div>
    `;

    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changedQuant);

    const cartSection = document.getElementsByClassName('container content-section')[0];
    if (cartSection) {
        cartSection.style.display = 'block';
    }
    UpdateTotal() 
}

function changedQuant(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    UpdateTotal();
}

function removeItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.parentElement.parentElement;
    const title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
    
    cartRow.remove();

    let index = 0;
    while (localStorage.getItem(`title${index}`)) {
        if (localStorage.getItem(`title${index}`) === title) {
            localStorage.removeItem(`title${index}`);
            localStorage.removeItem(`price${index}`);
            localStorage.removeItem(`quantity${index}`);
            break;
        }
        index++;
    }

    
    window.cartItemCount--;
    UpdateTotal();
    updateCartMessage();
}

function UpdateTotal() {
    const cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        const priceElm = cartRow.getElementsByClassName('cart-price')[0];
        const quantityElem = cartRow.getElementsByClassName('cart-quantity-input')[0];

        // Checks whether priceElm and quantity Elm were properly 
        const priceText = priceElm.innerText.replace('Ksh ', '');
        const quantity = parseInt(quantityElem.value);

        console.log('Price Text:', priceText); 
        console.log('Quantity:', quantity);  

        const price = parseFloat(priceText);
        if (isNaN(price)) {
            console.error('Invalid price value:', priceText);
        }

        if (isNaN(quantity) || quantity <= 0) {
            console.error('Invalid quantity value:', quantity);
            quantity = 1; // Set to 1 if quantity is invalid
        }

        total += price * quantity;
    }
    //Total checking
    console.log('Total:', total);

    // total with two decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Ksh ' + total.toFixed(2);
}


function shoNone() {
    const cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemsContainer ? cartItemsContainer.getElementsByClassName('cart-row') : [];
    const cartSect = document.getElementsByClassName('container content-section')[0];

    if (cartRows.length === 0 && cartSect) {
        cartSect.style.display = 'none';
    }
}

function completePurchase() {
    const cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    const orderDetails = [];

    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        const itemTitle = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
        const itemPrice = cartRow.getElementsByClassName('cart-price')[0].innerText.replace('Ksh ', '');
        const itemQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;

        orderDetails.push({
            title: itemTitle,
            price: itemPrice,
            quantity: itemQuantity
        });
    }

    localStorage.setItem('orderHist', JSON.stringify(orderDetails));
    window.location.href = 'Orderhistory.html';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
