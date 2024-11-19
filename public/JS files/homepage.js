let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-content');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Auto-slide functionality (optional)
let slideInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 5000); // Change slide every 5 seconds

// Optionally, clear interval on user interaction
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
    });
});