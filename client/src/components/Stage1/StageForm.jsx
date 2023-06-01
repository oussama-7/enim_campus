import React from 'react';
import './StageForm.css';
import { Link } from 'react-router-dom';


const StageForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="container">
            <h1>Créer une session de collaboration de stage</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nom">Nom Complet de professeur:</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                />

                <label htmlFor="specialite">Spécialité :</label>
                <input
                    type="text"
                    id="specialite"
                    name="specialite"
                    required
                />
                <label htmlFor="Mail">Mail :</label>
                <input
                    type="text"
                    id="Mail"
                    name="Mail"
                    required
                />

                <label htmlFor="nome">Nom Complet de l'étudiant encadré :</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                />

                <label htmlFor="specialite_etudiant">Spécialité de l'étudiant :</label>
                <input
                    type="text"
                    id="specialite_etudiant"
                    name="specialite_etudiant"
                    required
                />

                <label htmlFor="niveau">Niveau :</label>
                <input
                    type="text"
                    id="niveau"
                    name="niveau"
                    required
                />
                <label htmlFor="Email">Email :</label>
                <input
                    type="text"
                    id="Email"
                    name="Email"
                    required
                />

                <label htmlFor="sujet">Sujet du Stage :</label>
                <input
                    type="text"
                    id="sujet"
                    name="sujet"
                    required
                />

                <label htmlFor="entreprise">Nom de l'entreprise :</label>
                <input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    required
                />

                <label htmlFor="pin">Code PIN de la session :</label>
                <input
                    type="password"
                    id="pin"
                    name="pin"
                    required
                />

                <Link to="/Depot"><span to="" className="btn btn-outline-light btn-lg download-button">Creer une Session</span></Link>
            </form>
        </div>
    );
};

export default StageForm;
