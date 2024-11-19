document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.cart-total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const purchaseButton = document.querySelector('.Checkout-btn');

    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    function displayCartItems() {
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            purchaseButton.style.display = 'none';
            totalPriceElement.innerText = 'Ksh 0.00';
        } else {
            emptyCartMessage.style.display = 'none';
            purchaseButton.style.display = 'block';

            let totalPrice = 0;

            cart.forEach(item => {
                console.log('Processing item:', item);

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-row');

                cartItem.innerHTML = `
                    <div class="cart-item cart-column">
                        <img src="${item.image}" width="100" alt="${item.name}">
                        <span class="cart-item-title">${item.name}</span>
                    </div>
                    <span class="cart-price cart-column">Ksh ${item.price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="btn-danger" type="button" data-id="${item.id}">REMOVE</button>
                    </div>
                `;

                cartContainer.appendChild(cartItem);

                
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity, 10);
                if (!isNaN(price) && !isNaN(quantity)) {
                    totalPrice += price * quantity;
                } else {
                    console.error('Invalid price or quantity:', item);
                }
            });

            
            console.log('Total Price Calculated:', totalPrice);
            totalPriceElement.innerText = 'Ksh ' + totalPrice.toFixed(2);
        }
    }

    
    function updateTotal() {
        let totalPrice = 0;

        cart.forEach(item => {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity, 10);
            if (!isNaN(price) && !isNaN(quantity)) {
                totalPrice += price * quantity;
            }
        });

        totalPriceElement.innerText = 'Ksh ' + totalPrice.toFixed(2);
    }

    function changedQuantity(event) {
        const input = event.target;
        const itemId = input.getAttribute('data-id');
        const newQuantity = parseInt(input.value, 10) || 1;

        
        cart = cart.map(item => {
            if (item.id === itemId) {
                item.quantity = newQuantity > 0 ? newQuantity : 1;
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotal();
    }

    
    function removeItem(event) {
        const itemId = event.target.getAttribute('data-id');

        
        cart = cart.filter(item => item.id !== itemId);

        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    
    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-danger')) {
            removeItem(event);
        }
    });

    cartContainer.addEventListener('input', function (event) {
        if (event.target.classList.contains('cart-quantity-input')) {
            changedQuantity(event);
        }
    });

    
    function completePurchase() {
        const orderDetails = cart.map(item => ({
            title: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        
        localStorage.setItem('orderHist', JSON.stringify(orderDetails));
        localStorage.removeItem('cart'); 
        window.location.href = 'Orderhistory.html';
    }


    purchaseButton.addEventListener('click', completePurchase);

    
    displayCartItems();
});
