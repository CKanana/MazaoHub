var orderHistory = JSON.parse(localStorage.getItem('orderHist')) || [];


var orderHistoryContainer = document.getElementById('Orders-sec').getElementsByClassName('Orders-inner')[0];
if (orderHistory.length === 0) {
    orderHistoryContainer.innerHTML = '<p>No orders have been placed yet.</p>';
} else {
    orderHistory.forEach(function (orderItem) {
      
        var orderItemEl = document.createElement('div');
        orderItemEl.id = ('Order-item-sec')
        orderItemEl.classList.add('order-item');
        
      
        orderItemEl.innerHTML = `
            <h4 style=''>${orderItem.title}</h4>
            <p>Price: ${orderItem.price}</p>
            <p>Quantity: ${orderItem.quantity}</p>
            <p id="total">Total:${(orderItem.price)*(orderItem.quantity)}
        `;
        
    
        orderHistoryContainer.appendChild(orderItemEl);
        var sokobutton = document.getElementById('Soko-but')
        sokobutton.remove()
    });
}

function sokoPage() {
    window.location.href = 'Soko.html';
}

var sokobutton = document.getElementById('Soko-but');
sokobutton.addEventListener('click', sokoPage);