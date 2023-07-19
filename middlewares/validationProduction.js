import validator from 'validator';

 export const validationProduction = (req, res, next) => {
  const { nom, ressource, delai, etat, cout } = req.body;

  if (nom==="") {
    return res.status(400).json({ error: "Le champ 'nom du produit' est requis." });
  }
  if (ressource==="") {
    return res.status(400).json({ error: "La ressource 'du' est requis." });
  }
  if (delai==="") {
    return res.status(400).json({ error: "Le le delai 'de la production' est requis." });
  }
  if (etat==="") {
    return res.status(400).json({ error: "L'etat de la production rst requis." });
  }
  if (cout==="") {
    return res.status(400).json({ error: "Le cout de la production est requis." });
  }
  next();
};
export default validationProduction;
