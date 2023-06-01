
import './Depot.css';
import React, { useState } from 'react';

const Depot = () => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Logique de traitement de la soumission du formulaire ici
    };
    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };


    return (
        <div>
            <div className="menu">
                <div>
                    <a href="#">Avancement</a>
                    <a href="#">Chat</a>
                    <a href="#">Travail à faire</a>
                    <a href="#">Infos générales</a>
                </div>
                <div>
                    <a href="#">Déconnexion</a>
                </div>
            </div>
            <div className="dropzone">
                <div>Déposez vos documents ici</div>
            </div>
            <div>
                <h2>Déposer un document PDF</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>Entrer le nom du document :</label>
                    <input type="String" id="name" name="name" />
                    <select id="type" name="type" value={selectedType} onChange={handleTypeChange} required>
                        <option value="">Sélectionnez un type</option>
                        <option value="remarque">Remarque</option>
                        <option value="support">Support</option>
                        <option value="travail à faire">Travail à faire</option>
                    </select>
                    <label htmlFor="pdfFile">Sélectionnez un fichier PDF :</label>
                    <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" />

                    <input type="submit" value="Valider" />
                </form>
            </div>
            <div className="comments">
                <h2>Commentaires</h2>
                <form>
                    <label htmlFor="name">Nom :</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="comment">Commentaire :</label>
                    <textarea id="comment" name="comment"></textarea>

                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        </div>
    );
};

export default Depot;

