import express from "express";
import cors from 'cors'
import passport from 'passport';
const  app = express();
import inscription from './routes/RouteInscription.js'
import connexion from './routes/RouteConnexion.js'
import inscriptionEM from './routes/RouteInvitationEM.js'
import user from './routes/RouteUser.js'
import AjoutEM from './routes/RouteAjoutEntrepriseMiniere.js'
import AffichageEM from './routes/RouteRecupEM.js'
import AffichageUser from './routes/RouteRecupUser.js'

import EditEM from './routes/RouteEditEM.js'
import GetEMId from './routes/RouteGetEMId.js'
import Entreprise from "./models/entreprises.js";
import User from "./models/users.js";
import DeleteEM from "./routes/RouteDeleteEM.js"
import UserEM from "./routes/RouteUserEM.js"
import article from './routes/RouteArticle.js';
import searchArticleRoutes from './routes/RouteSearchArticle.js';


import Article from './models/article.js';
import UserAttente from "./routes/RouteGetUserAttente.js"
import CountRole from "./routes/RouteCountRole.js"

import GetDemandeCotation from "./routes/cotation/RoutegetDemandeCotation.js";
import DemandeCotation from "./routes/cotation/RouteDemandeCotation.js";
import DemandeCotationModel from "./models/demandeCotation.js"
import DeleteDM from "./routes/cotation/RouteSuppressionDM.js"
import GetLastDemandeCotation from "./routes/cotation/RoutegetLastDemandeCotation.js";

import GetAllArticles from "./routes/article/RouteGetArticles.js"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(passport.initialize());
app.use('/AjoutEM',AjoutEM);
app.use('/CountRole',CountRole);

app.use('/UserAttente',UserAttente);


app.use('/EditEM',EditEM);
app.use('/GetEM',AffichageEM);
app.use('/GetUser',AffichageUser);

app.use('/GetEMId',GetEMId);
app.use('/UserEM',UserEM);
app.use('/DeleteEM',DeleteEM);

app.use('/articles', article);

//Cotation
app.use('/demandeCotation', DemandeCotation);
app.use('/getdemandeCotation', GetDemandeCotation);
app.use('/deleteDM', DeleteDM)
app.use('/getlastdemandeCotation', GetLastDemandeCotation);

app.use('/inscription',inscription);
app.use('/inscriptionEM',inscriptionEM);
app.use('/user',user);

app.use('/getAllArticles',GetAllArticles)
app.use('/connexion',connexion);
app.use('/articles', searchArticleRoutes);
await User.sync();
await Entreprise.sync();
await Article.sync();
await DemandeCotationModel.sync(),

app.listen(5000, () => {
  console.log("le serveur tourne sur le port 5000");
});






