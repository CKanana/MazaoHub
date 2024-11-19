document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.cart-total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const purchaseButton = document.querySelector('.Checkout-btn');

    // Retrieve cart items from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display cart items
    function displayCartItems() {
        cartContainer.innerHTML = ''; // Clear the current items in the cart

        // Check if the cart is empty
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            purchaseButton.style.display = 'none'; // Hide the checkout button if cart is empty
        } else {
            emptyCartMessage.style.display = 'none';
            purchaseButton.style.display = 'block'; // Show the checkout button if cart has items

            // Loop through the cart and create HTML for each item
            let totalPrice = 0;

            cart.forEach(item => {
                // Create cart item div
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-row');

                // Add product details to the cart item div
                cartItem.innerHTML = `
                    <div class="cart-item cart-column">
                        <img src="${item.image}" width="100" alt="${item.name}">
                        <span class="cart-item-title">${item.name}</span>
                    </div>
                    <span class="cart-price cart-column">Ksh ${item.price}</span>
                    <div class="cart-quantity cart-column">
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                `;
                // Append the item to the cart container
                cartContainer.appendChild(cartItem);

                // Add to total price
                totalPrice += parseFloat(item.price);
            });

            // Update the total price
            totalPriceElement.innerText = totalPrice.toFixed(2);
        }
    }

    // Function to remove an item from the cart
    function removeItemFromCart(event) {
        const productId = event.target.dataset.id;
        
        // Remove item from the cart array
        cart = cart.filter(item => item.id !== productId);
        
        // Save the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Re-render the cart
        displayCartItems();
    }

    // Add event listeners for remove buttons
    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            removeItemFromCart(event);
        }
    });

    // Call the function to display the items on page load
    displayCartItems();
});
