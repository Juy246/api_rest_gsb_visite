import { Types } from "mongoose";

/**
 * Interface représentant un portefeuille
 */
export interface IPortefeuille {
  _id?: string;
  dateDebutSuivi: Date;
  dateFinSuivi?: Date;
  visiteurId: Types.ObjectId;
  praticienId: Types.ObjectId;
}

/**
 * Interface pour la création d'un portefeuille
 */
export interface ICreatePortefeuille {
    dateDebutSuivi: Date;
    dateFinSuivi?: Date;
    visiteurId: Types.ObjectId;
    praticienId: Types.ObjectId;
}
