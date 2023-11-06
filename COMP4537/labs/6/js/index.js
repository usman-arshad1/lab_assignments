//Used for getting the input in the word search
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query.length > 0) {
        searchWord(query);
    } else {
        clearResults();
    }
});
//Used for getting the input in the word search
document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('deleteInput').value.toLowerCase();
    if (query.length > 0) {
        deleteWord(query);
    } else {
        clearResults();
    }
});
//Used in the adding word to the dictionary
document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('addWordInput').value.toLowerCase();
    const wordLanguage = document.getElementById('addWordLanguageInput').value;
    const definition = document.getElementById('addDefinitionInput').value;
    const definitionLanguage = document.getElementById('addDefinitionLanguageInput').value;
    if (word && wordLanguage && definition && definitionLanguage) {
        addDefinition(word, definition, wordLanguage, definitionLanguage);
    }
});
//Used in the adding word to the dictionary
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('updateWordInput').value.toLowerCase();
    const wordLanguage = document.getElementById('updateWordLanguageInput').value;
    const definition = document.getElementById('updateDefinitionInput').value;
    const definitionLanguage = document.getElementById('updateDefinitionLanguageInput').value;
    if (word && wordLanguage && definition && definitionLanguage) {
        updateDefinition(word, definition, wordLanguage, definitionLanguage);
    }
});

//The post request to search for the word in the API backend
function searchWord(word) {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Open a connection to the api using the get for searching a word
    xhr.open('GET', `http://localhost:3000/api/v1/definition?word=${word}`, true);
    //Sends the above request to the backend
    xhr.send();
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //take the returned data and store it in a variable 
            let data = JSON.parse(xhr.responseText)
            console.log(data)
            //Add the data to the div for the results
            document.getElementById('results').innerHTML = 
                word + ": " + data.response
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            //Else for if returns an error like word doesnt exist
            let data = JSON.parse(xhr.responseText)
            document.getElementById('results').innerHTML = 
                data.response
        }
    };
    
}

//The post request to search for the word in the API backend
function deleteWord(word) {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    let sendingData = {word: `${word}`}
    //Make them a JSON and put in data variable to send later in the body of the POST
    let data = JSON.stringify(sendingData);
    //Open a connection to the api using the get for searching a word
    xhr.open('DELETE', `http://localhost:3000/api/v1/definition`, true);
    //Sends the above request to the backend
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data);
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //take the returned data and store it in a variable 
            let data = JSON.parse(xhr.responseText)
            console.log(data)
            //Add the data to the div for the results
            document.getElementById('results').innerHTML = 
                data.response
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            //Else for if returns an error like word doesnt exist
            let data = JSON.parse(xhr.responseText)
            document.getElementById('results').innerHTML = 
                data.response
        }
    };
    
}

function addDefinition(word, definition,  wordLanguage, definitionLanguage) {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Turn the word and definition into JSON format
    let sendingData = {word: `${word}`, definition: `${definition}`, wordLanguage: wordLanguage, definitionLanguage: definitionLanguage}
    //Make them a JSON and put in data variable to send later in the body of the POST
    let data = JSON.stringify(sendingData);
    //Open a connection to the api using POST for adding a word in the body
    xhr.open('POST', 'http://localhost:3000/api/v1/definition', true);
    //Send data to backend
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data);
    //Check the ready state response from the backend
    xhr.onreadystatechange = function() {
        //If the word saves does this part with a return of the data from the server and adds to results
        if (xhr.readyState === 4 && xhr.status === 200) {
            let info = JSON.parse(this.responseText)
                document.getElementById('results').innerHTML = 
                    info.response + ": " + info.message;
        } else if (xhr.readyState === 4 && xhr.status !== 200){
            //If definition in the dictionary than response of error in the results box
            let info = JSON.parse(this.responseText)
            document.getElementById('results').innerHTML = 
                info.response
        }
    };
}

function updateDefinition(word, definition,  wordLanguage, definitionLanguage) {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Turn the word and definition into JSON format
    let sendingData = {word: `${word}`, definition: `${definition}`, wordLanguage: wordLanguage, definitionLanguage: definitionLanguage}
    //Make them a JSON and put in data variable to send later in the body of the POST
    let data = JSON.stringify(sendingData);
    //Open a connection to the api using POST for adding a word in the body
    xhr.open('PATCH', 'http://localhost:3000/api/v1/definition', true);
    //Send data to backend
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data);
    //Check the ready state response from the backend
    xhr.onreadystatechange = function() {
        //If the word saves does this part with a return of the data from the server and adds to results
        if (xhr.readyState === 4 && xhr.status === 200) {
            let info = JSON.parse(this.responseText)
                document.getElementById('results').innerHTML = 
                    info.response;
        } else if (xhr.readyState === 4 && xhr.status !== 200){
            //If definition in the dictionary than response of error in the results box
            let info = JSON.parse(this.responseText)
            document.getElementById('results').innerHTML = 
                info.response
        }
    };
}

//function for clearing the reults div if you search any word shorter than 3 characters.
function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
}