let currentSlide = 0
let autoSlideInterval
let isAutoSlidePlaying = true

document.querySelector("#prevButton").addEventListener("click", function () {
    prevSlide()
    resetAutoSlide()
});

document.querySelector("#nextButton").addEventListener("click", function () {
    nextSlide()
    resetAutoSlide()
});

document.querySelector("#pauseButton").addEventListener("click", function () {
    toggleAutoSlide()
});

const images = document.querySelectorAll(".slider-slide");

function showSlide(index) {
    if (index >= images.length) {
        currentSlide = 0
    } else if (index < 0) {
        currentSlide = images.length - 1
    } else {
        currentSlide = index
    }

    const offset = -currentSlide * 600
    
    document.querySelector(".slider-elements").style.transform = `translateX(${offset}px)`
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

function toggleAutoSlide() {
    isAutoSlidePlaying = !isAutoSlidePlaying;
    resetAutoSlide();
    updateButtonLabel();
}

function updateButtonLabel() {
    const pauseButton = document.querySelector("#pauseButton");
    pauseButton.innerHTML = isAutoSlidePlaying ? "Pause" : "Start";
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    if (isAutoSlidePlaying) {
        autoSlideInterval = setInterval(nextSlide, 2000);
    }
}

resetAutoSlide();

