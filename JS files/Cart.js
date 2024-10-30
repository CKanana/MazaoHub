
if (document.readyState = 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    shoNone();
    var remoItem = document.getElementsByClassName("btn-danger")
    for (var i = 0; i < remoItem.length; i++) {
        var button = remoItem[i];
        button.addEventListener('click', removeItem)
    }
    var quantInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantInputs.length; i++) {
        var input = quantInputs[i]
        input.addEventListener('change', changedQuant)
    }

    var addCartBut = document.getElementsByClassName('shop-item')
    for (var i = 0; i < addCartBut.length; i++) {
        var button = addCartBut[i]
        button.addEventListener('click', AddToCart)
    }
    updateCartMessage();

}
/*The syntax of items for AddToCart should be as follows:
<div class="shop-item">
                    <span class="shop-item-title">Maize Bag</span>
                    <img class="shop-item-image" src=""> *if needed
                    <div class="shop-item-details">
                        <span class="shop-item-price">Kshs. 3000</span>
                        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                    </div>
                </div>
                */
function AddToCart(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    /*var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src*/
    console.log(title, price)
    addItemCart(title, price)
    UpdateTotal();
}

function addItemCart(title, price) {
    var cartRow = document.createElement('div')
    /*< div class="cart-row" >  </div > */
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemnames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemnames.length; i++){
        if(cartItemnames[i].innerText == title){
            alert('This item is already in the cart')
            return;
        }
    }
    var cartRowContents = `
        
                        <div class="cart-item cart-column">

                            <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="1">
                            <button class="btn-danger" type="button">REMOVE</button>
                        </div>
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changedQuant)
}

function changedQuant(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    UpdateTotal()
}
function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    UpdateTotal();
    updateCartMessage();
}

var remoItem = document.getElementsByClassName("btn-danger")
for (var i = 0; i < remoItem.length; i++) {
    var button = remoItem[i];
    button.addEventListener('click', function (event) {
        //console.log("clicked")
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        UpdateTotal();
    })

}

function updateCartMessage() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    var emptyCartMessage = document.getElementById('empty-cart-message');
    var contentSection = document.getElementsByClassName('content-section')[0];

    // Show message if there are no cart rows; otherwise, hide it
    if (cartRows.length === 0) {
        emptyCartMessage.style.display = 'block';
        contentSection.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        contentSection.style.display = 'block';
    }
}


function UpdateTotal() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElm = cartRow.getElementsByClassName('cart-price')[0]
        var quantityELm = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //console.log(price, quantity)

        var price = parseFloat(priceElm.innerText.replace('Kshs ', ''))
        var quantity = quantityELm.value

        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Kshs. ' + total
}

function shoNone() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemsContainer ? cartItemsContainer.getElementsByClassName('cart-row') : [];
    var cartSect = document.getElementsByClassName('container content-section')[0];

    if (cartRows.length === 0 && cartSect) {
        cartSect.style.display = 'none';
    }
}
// Function to handle purchase and save order to localStorage
function completePurchase() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    var orderDetails = [];

    // Gather order details from each cart row
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var itemTitle = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
        var itemPrice = cartRow.getElementsByClassName('cart-price')[0].innerText;
        var itemQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;

        // Store each item’s details in an object
        orderDetails.push({
            title: itemTitle,
            price: itemPrice,
            quantity: itemQuantity
        });
    }

    // Save order details to localStorage
    localStorage.setItem('orderHist', JSON.stringify(orderDetails));

    // Redirect to the order-history page
    window.location.href = 'Orderhistory.html';
}

// Add event listener to "PURCHASE" button
var purchaseButton = document.getElementsByClassName('Checkout-btn')[0];
purchaseButton.addEventListener('click', completePurchase);

