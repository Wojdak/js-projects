let currentSlide = 0
let autoSlideInterval

document.querySelector("#prevButton").addEventListener("click", function () {
    prevSlide()
    resetAutoSlide()
});

document.querySelector("#nextButton").addEventListener("click", function () {
    nextSlide()
    resetAutoSlide()
});

const images = document.querySelectorAll(".slider-image");

function showSlide(index) {
    if (index >= images.length) {
        currentSlide = 0
    } else if (index < 0) {
        currentSlide = images.length - 1
    } else {
        currentSlide = index
    }

    const offset = -currentSlide * 600
    
    document.querySelector(".slider-images").style.transform = `translateX(${offset}px)`
}

function nextSlide() {
    showSlide(currentSlide + 1)
}

function prevSlide() {
    showSlide(currentSlide - 1)
}

function goToSlide(index) {
    currentSlide = index
    offset = -index * 600
    
    showSlide(index)
    resetAutoSlide() 
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval)
    autoSlideInterval = setInterval(nextSlide, 2000)
}

resetAutoSlide();
