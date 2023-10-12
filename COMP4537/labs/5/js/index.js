document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const string = document.getElementById('queryInput').value.toLowerCase();
    if (string) {
        let query = string.split(';')
        searchDatabase(query[0] + ";")
    }
});

const insertData = () => {
    //Create a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //SQL Query for insert default
    let insert = 
                `
                INSERT INTO ''.'patient' ('name', 'dateOfBirth') VALUES 
                                                ('Sara Brown', '1901-01-01'),
                                                ('John Smith', '1941-01-01'),
                                                ('Jack Ma', '191-01-30'),
                                                ('Elon Musk', '1999-01-01');
                `
    //JSONify the data
    let data = JSON.stringify(insert);
    //Open a connection to the api using the get for searching a word
    xhr.open('POST', `https://localhost:3000/api/sql`, true);
    //Sends the above request to the backend
    xhr.send(data);
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //take the returned data and store it in a variable 
            //Add the data to the div for the results
            document.getElementById('results').innerHTML = 
                data.response
        } else {
            //Else for if returns an error like word doesnt exist
            data = JSON.parse(xhr.responseText)
            document.getElementById('results').innerHTML = 
                data.response
        }
    };
}

const searchDatabase = (inputted) => {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Open a connection to the api using the get for using the query
    xhr.open('GET', `https://localhost:3000/api/sql?query=${query}`, true);
    //Sends the above request to the backend
    xhr.send();
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //take the returned data and store it in a variable 
            let data = JSON.parse(xhr.responseText)
            //Add the data to the div for the results
            document.getElementById('results').innerHTML = 
                data.response
        } else {
            //Else for if returns an error like word doesnt exist
            data = JSON.parse(xhr.responseText);
            document.getElementById('results').innerHTML = 
                data.response
        }
    };
    
}
