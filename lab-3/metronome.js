let metronomeInterval
let isMetronomeOn

document.getElementById('toggle-metronome').addEventListener('click', () => {
    isMetronomeOn = !isMetronomeOn

    if (isMetronomeOn) {
        const bpm = parseInt(document.getElementById('bpm-input').value)
        startMetronome(bpm)
    } else {
        stopMetronome()
    }
});

function startMetronome(bpm) {
    const interval = 60 / bpm * 1000;
    metronomeInterval = setInterval(() => playMetronomeSound(), interval)
}

function playMetronomeSound() {
    const metronomeSound = new Audio('./sounds/boom.wav')
    metronomeSound.play()
}

function stopMetronome() {
    clearInterval(metronomeInterval)
}
