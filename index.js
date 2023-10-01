const express = require('express');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({extended: false}));


app.get('/', (req,res) => { 
    res.sendFile("./index.html", { root: __dirname })
}); 

app.use(express.static(__dirname));

app.listen(port, () => {
	console.log("Listening on port " + port);
}); 