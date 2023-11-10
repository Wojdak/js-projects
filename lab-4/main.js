document.addEventListener("DOMContentLoaded", function () {
    displayNotes()
})

function addNote() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const color = document.getElementById("color").value
    const pin = document.getElementById("pin").checked
    const date = new Date().toLocaleString()

    const note = { title, content, color, pin, date }

    let notes = JSON.parse(localStorage.getItem("notes"))
    notes.push(note)
    localStorage.setItem("notes", JSON.stringify(notes))

    displayNotes()
}

function displayNotes() {
    const noteList = document.getElementById("note-list")
    noteList.innerHTML = ""

    let notes = JSON.parse(localStorage.getItem("notes"))

    const pinnedNotes = notes.filter(note => note.pin)
    const unpinnedNotes = notes.filter(note => !note.pin)

    pinnedNotes.forEach((note, index) => {
        const noteElement = createNoteElement(note, index)
        noteList.appendChild(noteElement)
    })

    unpinnedNotes.forEach((note, index) => {
        const noteElement = createNoteElement(note, index + pinnedNotes.length)
        noteList.appendChild(noteElement)
    })
}

function createNoteElement(note, index) {
    const noteElement = document.createElement("div")
    noteElement.classList.add("note")
    noteElement.style.backgroundColor = note.color

    noteElement.innerHTML = `
        <div class="note-content">
            <div class="note-title">${note.title}</div>
            <div>${note.content}</div>
        </div>
        <div class="note-actions">
            <div>${note.date}</div>
            <button onclick="deleteNote(${index})">Usuń</button>
        </div>
    `

    return noteElement
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"))
    notes.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notes))

    displayNotes()
}