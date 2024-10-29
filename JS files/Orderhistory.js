var orderHistory = JSON.parse(localStorage.getItem('orderHist')) || [];

// Display order details on the page
var orderHistoryContainer = document.getElementByClassName('Order');
if (orderHistory.length === 0) {
    orderHistoryContainer.innerText = 'No orders have been placed yet.';
} else {
    orderHistory.forEach(function (orderItem) {
        var order = getElementByClassName('Order')
        var orderItemEl = order.createElement('div');
        orderItemEl.classList.add('order-item');
        orderItemEl.innerHTML =
            `
                    <h2>${orderItem.title}</h2>
                    <p>Price: ${orderItem.price}</p>
                    <p>Quantity: ${orderItem.quantity}</p>
                    <hr>
                `
        orderHistoryContainer.appendChild(orderItemEl);
    });
}
