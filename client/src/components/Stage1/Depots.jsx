import React from 'react';
import './Sessions.css';

const Depots = () => {
    const sessions = [
        { id: 1, name: 'Session 1', description: 'Description de la session 1' },
        { id: 2, name: 'Session 2', description: 'Description de la session 2' },
        { id: 3, name: 'Session 3', description: 'Description de la session 3' },
    ];

    return (
        <div>
            <h1>Sessions de collaboration</h1>
            <div className="container">
                {sessions.map((session) => (
                    <div className="session" key={session.id}>
                        <h2>{session.name}</h2>
                        <p>{session.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Depots;
