import React from 'react';
import './Stage1.css';

function Stage1() {
    return (
        <div className="container">
            <h1 className="title">Bienvenue sur l'espace stage</h1>
            <div className="buttonContainer">
                <a href="/StageForm" className="button primary">
                    Créer une session
                </a>
                <a href="/Pin" className="button secondary">
                    Accéder à une session
                </a>
            </div>
        </div>
    );
}

export default Stage1;

