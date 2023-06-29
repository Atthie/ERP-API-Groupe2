import ArticleCotation from "../models/articleCotation.js";
 

export const addArticleCotation = async (req, res) => {
  try {
    const { quantite, dmId, articleId } = req.body;

    const newArticleCotation = await ArticleCotation.create({ quantite, dmId, articleId });

    return res.status(201).json(newArticleCotation);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article à la cotation', error);
    return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article à la cotation.' });
  }
};











