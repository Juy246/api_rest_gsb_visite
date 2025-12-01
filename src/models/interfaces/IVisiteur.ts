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
}


/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
}
