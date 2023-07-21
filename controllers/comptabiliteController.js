import comptabilite from "../models/comptabilite.js";


export const Affcomptabilite = async (req, res) =>{
   try{
    const ComptReq = await comptabilite.findAll();
    res.json(ComptReq);
   }catch (error){
    console.error (error);
    res.status(500).json({error:'Une erreur s\'est produite lors de la récupération des transactions'})
   }
  // res.send("AfficherComptabilite")
  // console.log("voka")
}


export const ReqComptabilite = async(req, res) =>{
  const {montant,description,transaction} = req.body;

  if (montant === "" ||description === "" || transaction ===""){
    return res.status(500).json ({status:'veuillez remplir tout les champs'})
  }

  const PlanComptabilite = await comptabilite.create ({
    montant,
    description,
    transaction
  })
  return res.status(200).json({PlanComptabilite})
}