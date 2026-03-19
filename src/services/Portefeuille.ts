import { PortefeuilleModel, IPortefeuilleDocument } from "../models/Portefeuille";
import { ICreatePortefeuille } from "../models/interfaces/IPortefeuille";
/**
 * Service pour gérer la logique métier des portefeuilles
 */
export class PortefeuilleService {
  /**
   * Créer un nouveau portefeuille
   */
  public async addPraticienToPortefeuille(data: ICreatePortefeuille): Promise<IPortefeuilleDocument> {
    try {
        // Vérifier si le portefeuille existe déjà pour le même visiteur et praticien
        const existPortefeuille = await PortefeuilleModel.findOne({ 
            visiteurId: data.visiteur, 
            praticienId: data.praticien
        });
       
        if (existPortefeuille) {
          throw new Error(`Ce praticien est déjà dans le portefeuille de ce visiteur.`);
        }

        // Créer et sauvegarder le nouveau portefeuille
        const portefeuille = new PortefeuilleModel({ 
          visiteur: data.visiteur, 
          praticien: data.praticien, 
          dateDebutSuivi: new Date() 
        });
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
        const portefeuilles = await PortefeuilleModel.find({ visiteur: visiteurId })
          .populate('praticien', 'nom prenom')
          .sort({ createdAt: -1 })
          .select('-createdAt -updatedAt -__v')
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
    public async deletePraticienById(visiteurId: string, praticienId: string): Promise<void> {
    try {
      const result = await PortefeuilleModel.findOneAndDelete({
        visiteur: visiteurId,
        praticien: praticienId
      });

      if (!result) {
        throw new Error('Lien introuvable dans le portefeuille.');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Arreter la date de fin de suivi d'un praticien
   */
  public async stopSuiviPraticien(visiteurId: string, praticienId: string): Promise<void> {
    try {
      const updatedPortefeuille = await PortefeuilleModel.findOneAndUpdate({ 
          visiteur: visiteurId, 
          praticien: praticienId 
        },
        { dateFinSuivi: new Date() }
      );

      if (!updatedPortefeuille) {
        throw new Error(`Portefeuille introuvable`);
      }
    } catch (error) {
      throw error;
    }
  }

  /*
  * Recuperer le portefeuille de praticiens actifs d'un visiteur
  */
  public async getActivePortefeuilleByVisiteur(visiteurId: string): Promise<IPortefeuilleDocument[]> {
    try {
      const activePortefeuilles = await PortefeuilleModel.find({ 
          visiteur: visiteurId, 
          dateFinSuivi: null 
        })
        .populate('praticien', 'nom prenom')
        .sort({ createdAt: -1 })
        .select('-createdAt -updatedAt -__v')
        .exec();
      return activePortefeuilles;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des portefeuilles');
      }
    }

    public async countPraticienPortefeuilleByVisiteur(visiteurId: string): Promise<number> {
      return PortefeuilleModel.countDocuments({ visiteur: visiteurId });
    }

    public async countActivePraticienPortefeuilleByVisiteur(visiteurId: string): Promise<number> {
      return PortefeuilleModel.countDocuments({ visiteur: visiteurId, dateFinSuivi: null });
    }
}