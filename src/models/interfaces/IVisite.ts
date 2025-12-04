import { IVisiteur } from './IVisiteur';
import { IPraticien } from './IPraticien';
import { IMotif } from './IMotif';
import { Types } from 'mongoose';

/**
 * Interface représentant une visite
 */
export interface IVisite {
    _id?: string;
    date_visite: Date;
    commentaire: string;
    visiteur: IVisiteur;
    praticien: IPraticien;
    motif: IMotif;
}

/**
 * Interface pour la création d'une visite
 */
export interface ICreateVisite {
    date_visite: Date;
    commentaire?: string;
    visiteur: Types.ObjectId;
    praticien: Types.ObjectId;
    motif: Types.ObjectId;
}