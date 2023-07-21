import validationDataUser from "../middlewares/validationDataUser.js";
import production from "../models/production.js";




export const Production= async (req,res)=>{
  try {
    const data = await production.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des entreprises' });
  } 
}

export const ReqProduction= async (req,res)=>{
  const { nom, ressource, quantite,delai,etat,cout  } = req.body;
   
 console.log(delai)
    if(nom===""||ressource===""||quantite===""||delai===""||etat===""||cout===""){
      return res.status(500).json({status:'veuillez remplir tout les champs'})

    }
    const planProduction = await production.create({
      nom,
      ressource, 
      delai,
      cout,
      etat

    })
    console.log(planProduction)
    return res.status(201).json({planProduction})
 
}
