function createHeader() {
    // Header HTML as a string
    const headerHTML = `
        <header>
            <div class="hero">
                <!-- Navigation Menu -->
                <nav>
                    <div class="icon">
                        <img src="../Assets/Green and White Plants Organic Logo.png" alt="Mazao Hub Logo">
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
    <a href="Cart.html" class="cart-icon"><svg width="68" height="50" viewBox="0 0 68 71" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.83337 2.95837H14.1667L21.76 42.5705C22.0191 43.9325 22.7288 45.1559 23.7648 46.0267C24.8007 46.8974 26.097 47.36 27.4267 47.3334H54.9667C56.2964 47.36 57.5927 46.8974 58.6287 46.0267C59.6646 45.1559 60.3743 43.9325 60.6334 42.5705L65.1667 17.75H17M28.3334 62.125C28.3334 63.7589 27.0648 65.0834 25.5 65.0834C23.9352 65.0834 22.6667 63.7589 22.6667 62.125C22.6667 60.4912 23.9352 59.1667 25.5 59.1667C27.0648 59.1667 28.3334 60.4912 28.3334 62.125ZM59.5 62.125C59.5 63.7589 58.2315 65.0834 56.6667 65.0834C55.1019 65.0834 53.8334 63.7589 53.8334 62.125C53.8334 60.4912 55.1019 59.1667 56.6667 59.1667C58.2315 59.1667 59.5 60.4912 59.5 62.125Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg></a>
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
