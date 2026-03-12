import { Types } from "mongoose";

/**
 * Interface représentant un portefeuille
 */
export interface IPortefeuille {
  _id?: string;
  dateDebutSuivi: Date;
  dateFinSuivi?: Date;
  visiteur: Types.ObjectId;
  praticien: Types.ObjectId;
}

/**
 * Interface pour la création d'un portefeuille
 */
export interface ICreatePortefeuille {
    dateDebutSuivi: Date;
    dateFinSuivi?: Date;
    visiteur: String;
    praticien: String;
}
