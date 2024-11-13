let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('#nextButton');
const prevButton = document.querySelector('#prevButton');

function showSlide(index) {
    // Remove the active class from the current slide
    slides[currentSlide].classList.remove('active');

    // Update the current slide index
    currentSlide = index;

    // Add the active class to the new slide
    slides[currentSlide].classList.add('active');
}

// Auto-slide functionality
let slideInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 5000); // Change slide every 5 seconds

// Next and Previous Button Event Listeners
nextButton.addEventListener('click', () => {
    clearInterval(slideInterval); // Stop auto-slide on button press
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
});

prevButton.addEventListener('click', () => {
    clearInterval(slideInterval); // Stop auto-slide on button press
    let prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevSlide);
});

// Sample function to fetch product data from an API
async function fetchProducts() {
  const apiUrl = 'https://example.com/api/kenya/products'; // Replace with actual API URL
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const discountsGrid = document.querySelector('.discounts-grid');

    // Loop through the products and dynamically create the discount cards
    data.products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('discount-card');

      // Create the discount badge
      const discountBadge = document.createElement('div');
      discountBadge.classList.add('discount-badge');
      discountBadge.textContent = `${product.discount}% OFF`;
      card.appendChild(discountBadge);

      // Create the product image
      const img = document.createElement('img');
      img.src = product.image_url; // Assuming the API returns image URL
      img.alt = product.name;
      card.appendChild(img);

      // Create the product name
      const productName = document.createElement('h3');
      productName.textContent = product.name;
      card.appendChild(productName);

      // Create the original price
      const originalPrice = document.createElement('p');
      originalPrice.classList.add('original-price');
      originalPrice.textContent = `${product.original_price} Ksh`;
      card.appendChild(originalPrice);

      // Create the discounted price
      const discountedPrice = document.createElement('p');
      discountedPrice.classList.add('discounted-price');
      discountedPrice.textContent = `${product.discounted_price} Ksh`;
      card.appendChild(discountedPrice);

      // Create the Buy Now button
      const buyNowButton = document.createElement('button');
      buyNowButton.classList.add('buy-now');
      buyNowButton.textContent = 'Buy Now';
      card.appendChild(buyNowButton);

      // Append the card to the grid
      discountsGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Call the function to fetch products
fetchProducts();



// Sample data of farmers (latitude, longitude, name, rating, and verification status)
const farmers = [
    { name: 'Farmer John', lat: 40.712776, lng: -74.005974, rating: 4.5, verified: true },
    { name: 'Farmer Anna', lat: 40.730610, lng: -73.935242, rating: 4.2, verified: false },
    { name: 'Farmer Bob', lat: 40.742054, lng: -74.012835, rating: 4.8, verified: true },
];


 // Initialize the map
 function initMap() {
    // Set default map center and zoom
    const mapCenter = { lat: -1.286389, lng: 36.817223 }; // Coordinates for Nairobi, Kenya
    const map = new google.maps.Map(document.getElementById("map"), {
      center: mapCenter,
      zoom: 10,
    });

    // Add a search box
    const input = document.getElementById("search-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // Bias the search box results to the map's viewport
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    // Handle search results
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));
      markers = [];

      // Iterate over each place and add a marker
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        // Create a marker for each place
        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name,
        });

        markers.push(marker);

        // Extend the map bounds to include the place location
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    // Array to hold custom markers
    let markers = [];

    // Example of adding a custom farmer location
    const farmerLocation = { lat: -1.303193, lng: 36.707308 }; // Example coordinates
    const farmerMarker = new google.maps.Marker({
      position: farmerLocation,
      map: map,
      title: "Farmer John Doe's Farm",
    });
  }

  // Load the map when the page loads
  window.onload = initMap;