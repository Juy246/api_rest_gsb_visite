import { Types } from "mongoose";

/**
 * Interface représentant un visiteur
 */
export interface IVisiteur {
  _id?: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  dateEmbauche?: Date;
  visites?: Types.ObjectId[];
  portefeuille?: Types.ObjectId[];
}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
}
