class Note {
    constructor(noteText, dateTime) {
        this.noteText = noteText;
    }
}

let notesHolder = [];

document.addEventListener('DOMContentLoaded', function() {
    if(typeof(Storage) !== "undefined") {
        let noteForm = document.getElementById("noteForm");

        noteForm.addEventListener("submit", (e) => {
            e.preventDefault();
            createNote();
        });
    
        notesHolder = JSON.parse(localStorage.getItem("notes") || "[]");
    
        populateNotes();
    
        saveNotes(); 
        const interval = setInterval(function() {
            saveNotes();
        }, 2000);
    } else {
        alert("Local Storage is not supported on this browser.");
    }
    
}, false);

function createNote() {
    let note = document.getElementById("formText");

    if (note.value != "") {
        let newNote = new Note(note.value);
        notesHolder.push(newNote);

        let notesDiv = document.getElementById("notes");
        let noteCard = createNoteCard(note.value, notesHolder.length - 1);

        notesDiv.appendChild(noteCard);
        note.value = "";


    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notesHolder));

    const currentDate = new Date().toLocaleTimeString();
    let dateSpan = document.getElementById("updated");
    dateSpan.innerHTML = currentDate;
}

function createNoteCard(noteText, cardNumber) {
    let noteCard = document.createElement("div");
    noteCard.className = "noteCard";

    let noteTextSpan = document.createElement("span");
    noteTextSpan.className = "noteText";
    let textNode = document.createTextNode(noteText);

    noteTextSpan.appendChild(textNode);
    noteCard.appendChild(noteTextSpan);

    let removeButton = document.createElement("button");
    let buttonTextNode = document.createTextNode("Remove");
    removeButton.appendChild(buttonTextNode);

    removeButton.addEventListener("click", function() {
        if (notesHolder.length === 1) {
            notesHolder = [];
        } else {
            notesHolder.splice(cardNumber, 1);
            noteCard.remove();
        }
    })

    noteCard.appendChild(removeButton);

    return noteCard;
}

function populateNotes() {

    let notesDiv = document.getElementById("notes");

    for (let i = 0; i < notesHolder.length; i++) {
        let noteCard = createNoteCard(notesHolder[i].noteText, i);

        notesDiv.appendChild(noteCard);
    }
}