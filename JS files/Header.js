function createHeader() {
    // Header HTML as a string
    const headerHTML = `
        <header>
            <div class="hero">
                <!-- Navigation Menu -->
                <nav>
                    <div class="icon">
                        <img src="../html files/images/Green and White Plants Organic Logo.png" alt="Mazao Hub Logo">
                        <h1>MazaoHub</h1>
                    </div>
                    <div class="navmenu">
                        <ul>
                            <li><a href="../html files/homepage.html">Home</a></li>
                            <li><a href="../html files/AboutUs.html">About</a></li>
                            <li><a href="../html files/Soko.html">Soko</a></li>
                            <li><a href="../html files/blog.html">Blog</a></li>
                            <li><a href="../html files/FAQs.html">FAQs</a></li>
                        </ul>
                    </div>
                    <div class="login">
                        <a href="signup.html" class="Lbtn">Login/Signup</a>
                    </div>
                    <div class="cart-icon">
    <a href="Cart.html" class="cart-icon"><img src="images/add-to-basket.png"></a>
    <span class="cart-counter" id="notification-counter">0</span>
</div>
                </nav>
            </div>
        </header>
    `;

    // Insert the header HTML at the top of the body
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
}

// Call the function to add the header when the page loads
document.addEventListener("DOMContentLoaded", createHeader);

function updateCartCounter(count) {
    const counterElement = document.getElementById("cart-counter");
    counterElement.textContent = count;
    
    // Show or hide the counter
    counterElement.style.display = count > 0 ? "inline-block" : "none";
}
