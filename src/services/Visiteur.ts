import { VisiteurModel, IVisiteurDocument} from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
import { PraticienModel } from '../models/Praticien';
/**
 * Service pour gérer la logique métier des visiteurs
 */
export class VisiteurService {
  /**
   * Créer un nouvel visiteur
   */
  public async createVisiteur(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });
     
      if (existingVisiteur) {
        throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
      }
      // Créer et sauvegarder le nouveau visiteur
      const visiteur = new VisiteurModel(visiteurData);
      await visiteur.save();
      return visiteur;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }

      /**
     * Récupérer tous les visiteurs
     * @returns Liste des visiteurs
     */
    public async getAllVisiteurs(): Promise<IVisiteurDocument[]> {
          try {
      const visiteurs = await VisiteurModel.find()
        .populate('visites')
        .sort({ dateCreation: -1 })
        .exec();
      return visiteurs;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visiteurs');
    }
  }

    /**
   * Récupérer un visiteur par son ID
   */
  public async getVisiteurById(id: string): Promise<IVisiteurDocument | null> {
    try {
      const visiteur = await VisiteurModel.findById(id).exec();
     
      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${id} introuvable`);
      }
      return visiteur;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }

  /**
   * Ajouter un praticien au portefeuille du visiteur
   * Utilise $addToSet pour éviter les doublons
   */
  public async addToPortefeuille(visiteurId: string, praticienId: string): Promise<IVisiteurDocument> {
    try {
      // Vérifier si le visiteur existe
      const visiteur = await VisiteurModel.findById(visiteurId);
      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
      }

      // Vérifier si le praticien existe
      const praticien = await PraticienModel.findById(praticienId);
      if (!praticien) {
        throw new Error(`Praticien avec l'ID ${praticienId} introuvable`);
      }

      // Ajouter avec $addToSet (évite les doublons)
      const updatedVisiteur = await VisiteurModel.findByIdAndUpdate(
        visiteurId,
        { $addToSet: { portefeuille: praticienId } },
        { new: true }
      ). populate('portefeuille'). exec();

      if (!updatedVisiteur) {
        throw new Error('Erreur lors de la mise à jour du portefeuille');
      }

      return updatedVisiteur;
    } catch (error: any) {
      if (error. name === 'CastError') {
        throw new Error('ID invalide');
      }
      throw error;
    }
  }

}
