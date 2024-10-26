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