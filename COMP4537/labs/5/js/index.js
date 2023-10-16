document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    clearResults()
    const string = document.getElementById('queryInput').value;
    if(string.split(" ")[0].toUpperCase() === "SELECT"){
        searchDatabase(string)
    } else if (string.split(" ")[0].toUpperCase() === "INSERT"){
        insertDatabase(string)
    } else {
        rightQuery()
    }
});

document.getElementById('Add Rows').addEventListener('submit', function(event) {
    event.preventDefault();
    clearResults();
    insertData();
});

function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
}

function rightQuery() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Please enter only SELECT or INSERT Query';
}

const insertData = () => {
    //Create a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Our way to differentiate the insert button and regular insert query.
    let insert = `!:!`
    //JSONify the data
    let data = JSON.stringify(insert);
    //Open a connection to the api using the get for searching a word
    xhr.open('POST', `http://localhost:3000/api/sql`, true);
    //Sends the above request to the backend
    xhr.send(data);
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //take the returned data and store it in a variable 
            //Add the data to the div for the results
            let info = JSON.parse(this.responseText)

            let table = document.getElementById('results')

            let header = document.createElement('div')
            header.innerHTML = "Patient ID | Patient Name | Date of Birth"
            table.appendChild(header)
            // Loop through the data array in the JSON
            for (var i = 0; i < info.data.length; i++) {
                // Create a new table row element
                var row = document.createElement("div");
                row.innerHTML = info.data[i].patientid + ", " + info.data[i].name + ", " + info.data[i].dateOfBirth + "\n"

                // Append the row to the table body
                table.appendChild(row);
            }
        } else if(xhr.readyState === 4 && xhr.status != 200){
            //Else for if returns an error like word doesnt exist
            let info = JSON.parse(this.responseText)
            document.getElementById('results').innerHTML = 
            console.log(info.response)
            info.response
        }
    };
}

const insertDatabase = (insert) => {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Our way to differentiate the insert button and regular insert query.
    let query = {info : `${insert}` }
    //JSONify the data
    let data = JSON.stringify(query);
    console.log(data)
    //Open a connection to the api using the get for using the query
    xhr.open('POST', `http://localhost:3000/api/sql`, true);
    //Sends the above request to the backend
    xhr.send(data);
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let info = JSON.parse(this.responseText)

            let table = document.getElementById('results')

            let header = document.createElement('div')
            header.innerHTML = "Patient ID | Patient Name | Date of Birth"
            table.appendChild(header)
            // Loop through the data array in the JSON
            for (var i = 0; i < info.data.length; i++) {
                // Create a new table row element
                var row = document.createElement("div");
                row.innerHTML = info.data[i].patientid + ", " + info.data[i].name + ", " + info.data[i].dateOfBirth + "\n"

                // Append the row to the table body
                table.appendChild(row);
            }
        } else if (xhr.readyState === 4 && xhr.status != 200){
            //Else for if returns an error like word doesnt exist
            let data = JSON.parse(xhr.responseText);
            document.getElementById('results').innerHTML = 
                data.response
        }
    };
    
}

const searchDatabase = (inputted) => {
    //Creat a new XMLHttpRequest from the backend
    const xhr = new XMLHttpRequest();
    //Open a connection to the api using the get for using the query
    xhr.open('GET', `http://localhost:3000/api/sql?query=${inputted}`, true);
    //Sends the above request to the backend
    xhr.send();
    //Returns the request based on the ready state and status of the request from the backend server
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let info = JSON.parse(this.responseText)

            let table = document.getElementById('results')

            let header = document.createElement('div')
            
            table.appendChild(header)
            // Loop through the data array in the JSON
            for (var i = 0; i < info.SELECT.length; i++) {
                // Create a new table row element
                var row = document.createElement("div");
                if(info.SELECT[i].patientid = undefined){
                    row.innerHTML = info.SELECT[i].name + ", " + info.SELECT[i].dateOfBirth + "\n"
                } else if (info.SELECT[i].patientid = undefined && info.select[i].dateOfBirth == undefined){
                    row.innerHTML = info.SELECT[i].name + "\n"
                } else if (info.SELECT[i].patientid = undefined && info.select[i].name == undefined){
                    row.innerHTML = info.SELECT[i].dateOfBirth + "\n"
                } else if (info.SELECT[i].name = undefined && info.select[i].dateOfBirth == undefined){
                    row.innerHTML = info.SELECT[i].patientid + "\n"
                } else if (info.SELECT[i].name){
                    row.innerHTML = info.SELECT[i].patientid + info.SELECT[i].dateOfBirth + "\n"
                } else if (info.SELECT[i].dateOfBirth == undefined){
                    row.innerHTML = info.SELECT[i].patientid + info.SELECT[i].name + "\n"
                }  else {
                    row.innerHTML = info.SELECT[i].patientid + ", " + info.SELECT[i].name + ", " + info.SELECT[i].dateOfBirth + "\n"
                }
                // Append the row to the table body
                table.appendChild(row);
            }
        } else if (xhr.readyState === 4 && xhr.status != 200) {
            //Else for if returns an error like word doesnt exist
            let data = JSON.parse(xhr.responseText);
            document.getElementById('results').innerHTML = 
                data.response
        }
    };
}

