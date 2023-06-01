import React from 'react';
import './Depot.css';

const Depot = () => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Logique de traitement de la soumission du formulaire ici
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

