import express from "express";
const app = express();
import inscription from './routes/RouteInscription.js'
import Entreprise from "./models/entreprises.js";
import User from "./models/users.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/inscription',inscription);
await User.sync();
await Entreprise.sync();

app.listen(5000, () => {
  console.log("le serveur tourne sur le port 5000");
});
