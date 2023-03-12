const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const app = express()
app.use(cors())

// the whole purpose of this file was to hide our API key on the backend
// we can use .get() from express so that when localhost:8000 was visited, we get the result of API calls
// frontend makes request through localhost instead
// this is the backend, the node.js stuff

app.get('/', (req, res) => {
    res.json("Index hi")
})

app.get('/results', (req, res) => {
    // get the level that was passed in on front end
    const passedLevel = req.query.level

    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: {level: passedLevel, area: 'gmat'},
        headers: {
            'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    };
        
    axios.request(options).then((response) => {
        res.json(response.data)
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
})

app.listen(PORT, () => console.log("Server running on PORT ${PORT}"))