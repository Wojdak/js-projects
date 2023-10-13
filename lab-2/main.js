const slides = document.querySelector('.slides');
let translateValue = 0;

const rightButton = document.querySelector('#right')
const leftButton = document.querySelector('#left')

rightButton.addEventListener('click', () => {
    translateValue -= 600;
})

leftButton.addEventListener('click', () => {
    translateValue+=600;
})

function continueSliding() {
    translateValue -= 1;

    if (translateValue <= -2400) {
        translateValue = 0;
    } else if(translateValue >0) {
        translateValue = 0;
    }

    slides.style.transform = `translateX(${translateValue}px)`;
}

let intervalRef = setInterval(continueSliding, 16);
