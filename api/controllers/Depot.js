import Depot from '../models/Depot.js';

// Méthode pour ajouter un nouvel élément au modèle "Depot"
const addDepot = async (req, res) => {
    try {
        const { name, type, document } = req.body;

        // Création d'une nouvelle instance du modèle "Depot"
        const depot = new Depot({
            name,
            type,
            document,
        });

        // Sauvegarde du nouvel élément dans la base de données
        const savedDepot = await depot.save();

        res.status(201).json(savedDepot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addDepot };
