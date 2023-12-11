document.addEventListener("DOMContentLoaded", function () {
    displayNotes()
})

function addNote() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const color = document.getElementById("color").value
    const pin = document.getElementById("pin").checked
    const date = new Date().toLocaleString()
    const tags = document.getElementById("tags").value.trim().split(",") // Rozdziel tagi po przecinku

    const note = { title, content, color, pin, date, tags}

    let notes = JSON.parse(localStorage.getItem("notes")) || []

    notes.push(note)
    localStorage.setItem("notes", JSON.stringify(notes))

    displayNotes()
}

function displayNotes() {
    const noteList = document.getElementById("note-list")
    noteList.innerHTML = ""

    let notes = JSON.parse(localStorage.getItem("notes")) || [] //Pusty array jezeli local storage jest pusty

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

    const tagsContent = note.tags.length > 0 ? note.tags.join(', ') : ''

    noteElement.innerHTML = `
        <div class="note-content">
            <div class="note-title">${note.title}</div>
            <div>${note.content}</div>
            <div class="note-tags">${tagsContent}</div>
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

function searchNotes() {
    const searchText = document.getElementById("search").value.toLowerCase()
    let notes = JSON.parse(localStorage.getItem("notes")) || []

    const filteredNotes = notes.filter(note => {
        const content = note.content.toLowerCase()
        const title = note.title.toLowerCase()
        const tags = note.tags ? note.tags.join(', ') : ''; // Połącz tagi za pomocą przecinków

        return content.includes(searchText) || title.includes(searchText) || tags.includes(searchText)
    })

    displayFilteredNotes(filteredNotes)
}

function displayFilteredNotes(filteredNotes) {
    const noteList = document.getElementById("note-list")
    noteList.innerHTML = ""

    filteredNotes.forEach((note, index) => {
        const noteElement = createNoteElement(note, index)
        noteList.appendChild(noteElement)
    })
}