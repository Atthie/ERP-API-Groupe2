const express = require('express');
const app = express();

app.get('/',(req, res)=>{
    res.send('Hello World');
})


app.listen(5000, ()=>{
    console.log('le serveur tourne sur le port 5000');
})