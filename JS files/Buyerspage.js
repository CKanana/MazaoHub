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

// Sample data of farmers (latitude, longitude, name, rating, and verification status)
const farmers = [
    { name: 'Farmer John', lat: 40.712776, lng: -74.005974, rating: 4.5, verified: true },
    { name: 'Farmer Anna', lat: 40.730610, lng: -73.935242, rating: 4.2, verified: false },
    { name: 'Farmer Bob', lat: 40.742054, lng: -74.012835, rating: 4.8, verified: true },
];

// Initialize and add the map
function initMap() {
    // Center the map (you can center it based on user's location if available)
    const mapCenter = { lat: 40.730610, lng: -73.935242 };

    // Create the map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: mapCenter,
    });

    // Add markers for each farmer
    farmers.forEach(farmer => {
        const marker = new google.maps.Marker({
            position: { lat: farmer.lat, lng: farmer.lng },
            map: map,
            title: farmer.name,
            icon: farmer.verified ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

        // Add info window for each marker
        const infoWindow = new google.maps.InfoWindow({
            content: `<h4>${farmer.name}</h4>
                      <p>Rating: ${farmer.rating} ⭐</p>
                      <p>${farmer.verified ? 'Verified ✅' : 'Not Verified ❌'}</p>`,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}