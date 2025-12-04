import { VisiteModel, IVisiteDocument } from '../models/Visite';
import { ICreateVisite } from '../models/interfaces/IVisite';
import { VisiteurModel } from '../models/Visiteur';
import { PraticienModel } from '../models/Praticien';
import { MotifModel } from '../models/Motif';

/**
 * Service pour gérer la logique métier des visites
 */
export class VisiteService {
  /**
   * Créer une nouvelle visite
   */
  public async createVisite(visiteData: ICreateVisite): Promise<IVisiteDocument> {
    try {
      // Vérifier si le visiteur existe
      const existingVisiteur = await VisiteurModel.findById(visiteData. visiteur);
      if (!existingVisiteur) {
        throw new Error(`Visiteur avec l'ID ${visiteData.visiteur} introuvable`);
      }

      // Vérifier si le praticien existe
      const existingPraticien = await PraticienModel. findById(visiteData.praticien);
      if (! existingPraticien) {
        throw new Error(`Praticien avec l'ID ${visiteData.praticien} introuvable`);
      }

      // Vérifier si le motif existe
      const existingMotif = await MotifModel.findById(visiteData.motif);
      if (! existingMotif) {
        throw new Error(`Motif avec l'ID ${visiteData.motif} introuvable`);
      }

      // Créer et sauvegarder la nouvelle visite
      const visite = new VisiteModel(visiteData);
      await visite.save();
      return visite;
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
   * Récupérer toutes les visites
   * @returns Liste des visites
   */
  public async getAllVisites(): Promise<IVisiteDocument[]> {
    try {
      const visites = await VisiteModel.find()
        .populate('visiteur')
        .populate('praticien')
        .populate('motif')
        . sort({ date_visite: -1 })
        .exec();
      return visites;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visites');
    }
  }

  /**
   * Récupérer une visite par son ID
   */
  public async getVisiteById(id: string): Promise<IVisiteDocument | null> {
    try {
      const visite = await VisiteModel.findById(id)
        .populate('visiteur')
        .populate('praticien')
        . populate('motif')
        .exec();

      if (!visite) {
        throw new Error(`Visite avec l'ID ${id} introuvable`);
      }
      return visite;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }

  /**
   * Récupérer les visites d'un visiteur
   */
  public async getVisitesByVisiteur(visiteurId: string): Promise<IVisiteDocument[]> {
    try {
      const visites = await VisiteModel.find({ Visiteur: visiteurId })
        .populate('visiteur')
        .populate('praticien')
        .populate('motif')
        .sort({ date_visite: -1 })
        .exec();
      return visites;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID visiteur invalide: ${visiteurId}`);
      }
      throw new Error('Erreur lors de la récupération des visites du visiteur');
    }
  }

  /**
   * Récupérer les visites d'un praticien
   */
  public async getVisitesByPraticien(praticienId: string): Promise<IVisiteDocument[]> {
    try {
      const visites = await VisiteModel.find({ Praticien: praticienId })
        .populate('visiteur')
        .populate('praticien')
        . populate('motif')
        .sort({ date_visite: -1 })
        .exec();
      return visites;
    } catch (error: any) {
      if (error. name === 'CastError') {
        throw new Error(`ID praticien invalide: ${praticienId}`);
      }
      throw new Error('Erreur lors de la récupération des visites du praticien');
    }
  }
}