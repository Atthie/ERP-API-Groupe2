const express = require('express');
const app = express();
const path=require('path');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('inscription');
});
app.post('/inscription', (req, res) => {
    const { nom, email, motDePasse } = req.body;
 
    res.send('Inscription réussie !');
});


app.listen(5000, ()=>{
    console.log('le serveur tourne sur le port 5000');
})