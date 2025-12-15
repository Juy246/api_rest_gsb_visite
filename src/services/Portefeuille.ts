import { PortefeuilleModel, IPortefeuilleDocument } from "../models/Portefeuille";
import { ICreatePortefeuille } from "../models/interfaces/IPortefeuille";
/**
 * Service pour gérer la logique métier des portefeuilles
 */
export class PortefeuilleService {
  /**
   * Créer un nouveau portefeuille
   */
  public async addPraticienToPortefeuille(visiteurId: string, praticienId: string): Promise<IPortefeuilleDocument> {
    try {
        // Vérifier si le portefeuille existe déjà pour le même visiteur et praticien
        const existingPortefeuille = await PortefeuilleModel.findOne({ 
            visiteurId: visiteurId, 
            praticienId: praticienId 
        });
       
        if (existingPortefeuille) {
          throw new Error(`Un portefeuille pour le visiteur ${visiteurId} et le praticien ${praticienId} existe déjà`);
        }

        // Créer et sauvegarder le nouveau portefeuille
        const portefeuille = new PortefeuilleModel({ visiteurId, praticienId });
        await portefeuille.save();
        return portefeuille;
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
     * Récupérer les portefeuilles par visiteur ID
     * @returns Liste des portefeuilles
     */
    public async getPortefeuillesByVisiteurId(visiteurId: string): Promise<IPortefeuilleDocument[]> {
      try {
        const portefeuilles = await PortefeuilleModel.find({ visiteurId })
          .populate('visiteurId')
          .exec();

          if (!visiteurId){
            throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
          }
        return portefeuilles;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des portefeuilles');
      }
    }

    /**
     * Supprimer un portefeuille par son ID
     */

}