import express from "express";
import cors from 'cors'
import passport from 'passport';
const  app = express();
import inscription from './routes/RouteInscription.js'
import connexion from './routes/RouteConnexion.js'
import article from './routes/RouteArticle.js';
import searchArticleRoutes from './routes/RouteSearchArticle.js';


import Entreprise from "./models/entreprisesVendeur.js";
import User from "./models/users.js";
import Article from './models/article.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(passport.initialize());

app.use('/articles', article);
app.use('/inscription',inscription);
app.use('/connexion',connexion);
app.use('/articles', searchArticleRoutes);
await User.sync();
await Entreprise.sync();
await Article.sync();


app.listen(5000, () => {
  console.log("le serveur tourne sur le port 5000");
});
