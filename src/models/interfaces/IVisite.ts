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
    visiteur: IVisiteur; // visiteurId: Types.ObjectId;
    praticien: IPraticien; // praticienId: Types.ObjectId;
    motif: IMotif; // motifId: Types.ObjectId;
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