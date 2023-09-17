let notesArr = [];

document.addEventListener('DOMContentLoaded', function() {
    
    if(typeof(Storage) !== "undefined") {
        notesArr = JSON.parse(localStorage.getItem("notes") || "[]");

        retrieveNotes();
        const interval = setInterval(function() {
            retrieveNotes();
        }, 2000);
    } else {
        alert("Local Storage is not supported on this browser.");
    }
    
}, false);

function retrieveNotes() {
    notesArr = JSON.parse(localStorage.getItem("notes") || "[]");

    const currentDate = new Date().toLocaleTimeString();
    let dateSpan = document.getElementById("updated");
    dateSpan.innerHTML = currentDate;

    populateNotes();
}


function createNoteCard(noteText, cardNumber) {
    let noteCard = document.createElement("div");
    noteCard.className = "noteCard";

    let noteTextSpan = document.createElement("span");
    noteTextSpan.className = "noteText";
    let textNode = document.createTextNode(noteText);

    noteTextSpan.appendChild(textNode);
    noteCard.appendChild(noteTextSpan);

    return noteCard;
}

function populateNotes() {
    let notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = ""; 

    for (let i = 0; i < notesArr.length; i++) {
        let noteCard = createNoteCard(notesArr[i].noteText, i);

        notesDiv.appendChild(noteCard);
    }
}