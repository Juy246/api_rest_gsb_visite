import { body } from 'express-validator';


export const validateVisiteur = [
    body('nom')
        .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
        .trim()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).withMessage('Le nom ne doit contenir que des lettres, espaces, apostrophes ou traits d’union')
        .notEmpty().withMessage('Le nom est obligatoire'),
    body('prenom')
        .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
        .trim()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).withMessage('Le prénom ne doit contenir que des lettres, espaces, apostrophes ou traits d’union')
        .notEmpty().withMessage('Le prénom est obligatoire'),
    body('email')
        .isEmail().withMessage("L'email doit être valide")
        .notEmpty().withMessage("L'email est obligatoire")
        .trim()
        .matches(/^\S+@\S+\.\S+$/).withMessage("L'email est invalide")
        .normalizeEmail(),
    body('tel')
        .matches(/^(\+33|0)[1-9](\d{2}){4}$/).withMessage('Le numéro de téléphone français est invalide')
        .trim(),
    body('dateEmbauche')
        .optional()
        .isISO8601().withMessage("La date d'embauche doit être une date valide")
];