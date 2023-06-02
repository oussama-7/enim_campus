import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    nomProfesseur: { type: String, required: true },
    specialiteProfesseur: { type: String, required: true },
    EmailProfesseur: { type: String, required: true },
    nomEtudiant: { type: String, required: true },
    specialiteEtudiant: { type: String, required: true },
    niveau: { type: String, required: true },
    EmailEtudiants: { type: String, required: true },
    sujetStage: { type: String, required: true },
    nomEntreprise: { type: String, required: true },
    codePin: { type: String, required: true },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
