/**
 * Interface représentant un praticien
 */
export interface IPraticien {
  _id?: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  rue: string;
  codePostal: string;
  ville: string;
}


/**
 * Interface pour la création d'un praticien
 */
export interface ICreatePraticien {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  rue: string;
  codePostal: string;
  ville: string;
}
