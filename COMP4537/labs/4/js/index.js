document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query.length >= 3) {
        searchWord(query);
    } else {
        clearResults();
    }
});

document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('addWordInput').value.toLowerCase();
    const definition = document.getElementById('addDefinitionInput').value;
    if (word && definition) {
        addDefinition(word, definition);
    }
});


function searchWord(word) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://comp4537-lab4-backend.netlify.app/api/definitions?word=${word}`, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText)
            document.getElementById('results').innerHTML = 
                data.response + ": " + data.word + ": " + data.definition
        } else {
            let data = JSON.parse(xhr.responseText)
            document.getElementById('results').innerHTML = 
                data.response + ": " + data.error
        }
    };
    
}

function addDefinition(word, definition) {
    const xhr = new XMLHttpRequest();
    let sendingData = {word: `${word}`, definition: `${definition}`}
    let data = JSON.stringify(sendingData);
    xhr.open('POST', 'https://comp4537-lab4-backend.netlify.app/api/definitions', true);
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let info = JSON.parse(this.responseText)
                document.getElementById('results').innerHTML = 
                    info.response + ": " + info.message;
        } else {
            let info = JSON.parse(this.responseText)
            document.getElementById('results').innerHTML = 
                info.response + ": " + info.error;
        }
    };
}

function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
}