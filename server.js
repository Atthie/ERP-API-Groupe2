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
import UserEM from "./routes/RouteUserEM.js";
import article from './routes/RouteArticle.js';
<<<<<<< HEAD
import production from './routes/RouteProduction.js';
=======
import client from './routes/RouteClient.js';
>>>>>>> 6fe4e1486dae252451c4b324872ed938c10141c5
import searchArticleRoutes from './routes/RouteSearchArticle.js';

import Article from './models/article.js';
<<<<<<< HEAD
import Production from "./models/production.js";
import UserAttente from "./routes/RouteGetUserAttente.js"
import CountRole from "./routes/RouteCountRole.js"

import GetDemandeCotation from "./routes/cotation/RoutegetDemandeCotation.js";
import DemandeCotation from "./routes/cotation/RouteDemandeCotation.js";
import DemandeCotationModel from "./models/demandeCotation.js"
import DeleteDM from "./routes/cotation/RouteSuppressionDM.js"
import GetLastDemandeCotation from "./routes/cotation/RoutegetLastDemandeCotation.js";
import GetByIdDemandeCotation from "./routes/cotation/RoutegetByIdDemandeCotation .js";
import PublierDemandeCotation from "./routes/cotation/RoutePublierDM.js";


import AddArticleCotation from "./routes/cotation/RouteArticleCotation.js";

import GetAllArticles from "./routes/article/RouteGetArticles.js"
import ArticleCotation from "./models/articleCotation.js";
import  bodyParser from 'body-parser';
import router from "./routes/RouteProduction.js";
app.use(bodyParser.json());
=======
import Client from './models/client.js';
import UserAttente from "./routes/RouteGetUserAttente.js";
import CountRole from "./routes/RouteCountRole.js";
import DemandeCotation from "./routes/RouteDemandeCotation.js";
import DemandeCotationModel from "./models/demandeCotation.js";
>>>>>>> 6fe4e1486dae252451c4b324872ed938c10141c5
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
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
<<<<<<< HEAD
app.use('/productions', production);

//Cotation
app.use('/demandeCotation', DemandeCotation);
app.use('/getdemandeCotation', GetDemandeCotation);
app.use('/deleteDM', DeleteDM)
app.use('/getlastdemandeCotation', GetLastDemandeCotation);
app.use('/getbyiddemandeCotation', GetByIdDemandeCotation);
app.use('/publier', PublierDemandeCotation);




app.use('/addArticleCotation', AddArticleCotation);
=======
app.use('/clients', client);
//Cotation
app.use('/demandeCotations', DemandeCotation);
>>>>>>> 6fe4e1486dae252451c4b324872ed938c10141c5



app.use('/inscription',inscription);
app.use('/inscriptionEM',inscriptionEM);
app.use('/user',user);
app.use ('/Production',router)

app.use('/getAllArticles',GetAllArticles)
app.use('/connexion',connexion);
app.use('/articles', searchArticleRoutes);
<<<<<<< HEAD
await User.sync();
await Entreprise.sync();
await Article.sync();
await DemandeCotationModel.sync(),
await ArticleCotation.sync(),
await Production.sync(),

=======
>>>>>>> 6fe4e1486dae252451c4b324872ed938c10141c5

async function syncModels() {
  await User.sync();
  await Entreprise.sync();
  await Article.sync();
  await Client.sync();
  await DemandeCotationModel.sync()
};


app.listen(4000, () => {
  console.log("le serveur tourne sur le port 4000");
});






