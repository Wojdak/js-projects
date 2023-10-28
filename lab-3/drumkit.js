document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a': new Audio(document.querySelector('#s1').getAttribute('src')),
    's': new Audio(document.querySelector('#s2').getAttribute('src')),
    'd': new Audio(document.querySelector('#s3').getAttribute('src')),
    'f': new Audio(document.querySelector('#s4').getAttribute('src')),
    'g': new Audio(document.querySelector('#s5').getAttribute('src')),
    'h': new Audio(document.querySelector('#s6').getAttribute('src')),
    'j': new Audio(document.querySelector('#s7').getAttribute('src'))
}

const recordedChannels = [[], [], [], []]

let recordingChannel = null

for (let i = 1; i <= 4; i++) {
    document.getElementById(`record-channel${i}`).addEventListener('click', () => startRecording(i - 1))
}

for (let i = 1; i <= 4; i++) {
    document.getElementById(`play-channel${i}`).addEventListener('click', () => playChannel(i - 1))
}

document.getElementById('stop-recording').addEventListener('click', stopRecording)
document.getElementById('play-all-channels').addEventListener('click', playSelectedChannels)

function onKeyPress(event) {
    const sound = KeyToSound[event.key];

    playSound(sound)

    if (recordingChannel !== null) {
        recordedChannels[recordingChannel].push({ time: Date.now(), sound })
    }
}

function playSound(sound) {
    if(sound){
        sound.currentTime = 0
        sound.play()
    }
}

function startRecording(channel) {
    recordingChannel = channel
    recordedChannels[channel] = []
}

function stopRecording() {
    recordingChannel = null
}

function playChannel(channel) {
    recordedChannels[channel].forEach(({ time, sound }) => {
        setTimeout(() => playSound(sound), time - recordedChannels[channel][0].time)
    })
}

function playSelectedChannels() {
    for (let i = 1; i <=4; i++) {
        const checkbox = document.getElementById(`channel-checkbox${i}`)
        if (checkbox.checked) {
            playChannel(i-1)
        }
    }

}
