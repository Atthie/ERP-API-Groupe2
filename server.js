import express from "express";
import cors from 'cors'
import passport from 'passport';
const  app = express();
import inscription from './routes/RouteInscription.js'
import connexion from './routes/RouteConnexion.js'
import inscriptionEM from './routes/RouteInscriptionEM.js'

import Entreprise from "./models/entreprises.js";
import User from "./models/users.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(passport.initialize());

app.use('/inscription',inscription);
app.use('/inscriptionEM',inscriptionEM);

app.use('/connexion',connexion);
await User.sync();
await Entreprise.sync();


app.listen(5000, () => {
  console.log("le serveur tourne sur le port 5000");
});
