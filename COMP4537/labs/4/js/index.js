//Used for getting the input in the word search
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query.length >= 3) {
        searchWord(query);
    } else {
        clearResults();
    }
});
//Used in the adding word to the dictionary
document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('addWordInput').value.toLowerCase();
    const definition = document.getElementById('addDefinitionInput').value;
    if (word && definition) {
        addDefinition(word, definition);
    }
});

//The post request to search for the word in the API backend
function searchWord(word) {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Open a connection to the api using the get for searching a word
    xhr.open('GET', `https://vqpyclszgr.us14.qoddiapp.com/api/definitions?word=${word}`, true);
    //Sends the above request to the backend
    xhr.send();
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //take the returned data and store it in a variable 
            let data = JSON.parse(xhr.responseText)
            //Add the data to the div for the results
            document.getElementById('results').innerHTML = 
                data.response + ": " + data.word + ": " + data.definition
        } else {
            //Else for if returns an error like word doesnt exist
            let data = JSON.parse(xhr.responseText)
            document.getElementById('results').innerHTML = 
                data.response + ": " + data.error
        }
    };
    
}

function addDefinition(word, definition) {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Turn the word and definition into JSON format
    let sendingData = {word: `${word}`, definition: `${definition}`}
    //Make them a JSON and put in data variable to send later in the body of the POST
    let data = JSON.stringify(sendingData);
    //Open a connection to the api using POST for adding a word in the body
    xhr.open('POST', 'https://vqpyclszgr.us14.qoddiapp.com/api/definitions', true);
    //Send data to backend
    xhr.send(data);
    //Check the ready state response from the backend
    xhr.onreadystatechange = function() {
        //If the word saves does this part with a return of the data from the server and adds to results
        if (xhr.readyState === 4 && xhr.status === 200) {
            let info = JSON.parse(this.responseText)
                document.getElementById('results').innerHTML = 
                    info.response + ": " + info.message;
        } else {
            //If definition in the dictionary than response of error in the results box
            let info = JSON.parse(this.responseText)
            document.getElementById('results').innerHTML = 
                info.response + ": " + info.error;
        }
    };
}

//function for clearing the reults div if you search any word shorter than 3 characters.
function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
}