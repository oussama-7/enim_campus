import React from 'react';
import './Pin.css';

const Pin = () => {
    return (
        <div className="pin-container">
            <h1>Entrer votre code de la session</h1>
            <form>
                <label htmlFor="pin"></label>
                <input type="text" id="pin" name="pin" />
                <br />
                <input type="submit" value="Valider" />
            </form>
        </div>
    );
};

export default Pin;
