import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    nomProfesseur: { type: String },
    specialiteProfesseur: { type: String },
    EmailProfesseur: { type: String },
    nomEtudiant: { type: String },
    specialiteEtudiant: { type: String },
    niveau: { type: String },
    EmailEtudiants: { type: String },
    sujetStage: { type: String },
    nomEntreprise: { type: String },
    codePin: { type: String, unique: true },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
