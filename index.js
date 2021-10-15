const express = require('express');
const pgp = require('pg-promise')();

const app = express();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'imdb'

    // "types" - in case you want to set custom type parsers on the pool level
};

const db = pgp(cn);

getData = async () => {
    // const tconst = "tt0000038"
    const movie = await db.one("SELECT * FROM title_basics LIMIT 10");
    console.log(movie)
}

getData()



app.get('/movies', async (req, res) => {
    const movies = await db.any("SELECT * FROM title_basics LIMIT 10");
    
    res.json(movies);
})

app.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const movies = "";

    try {
        const movies = await db.one("SELECT * FROM title_basics WHERE tconst=$1", [id]);
        res.json(movies);
    }
    catch (err){
        res.status(404).send({"error": "The requested Movie ID does not exist"});
    }
})


app.get('*', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

// Setting up PORT and link to Localhost
const portNum = 3000;
const portUrl = `http://localhost:`;
app.listen(process.env.PORT || portNum, () => {
    console.log(portUrl + portNum);
});