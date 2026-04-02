import { Request, Response } from 'express';
import { VisiteService } from '../services/Visite';

export class VisiteController {
  private visiteService: VisiteService;

  constructor() {
    this.visiteService = new VisiteService();
  }

  /**
   * POST /api/visite - Créer une visite
   */
  public createVisite = async (req: Request, res: Response): Promise<void> => {
    console.log('Données reçues pour la création: ', req.body); // Log à verifier les données reçues
    try {
      const visite = await this.visiteService. createVisite(req.body);

      res.status(201).json({
        success: true,
        message: 'Visite créée avec succès',
        data: visite
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };

  /**
   * GET /api/visites - Récupérer toutes les visites
   */
  public getAllVisites = async (_req: Request, res: Response): Promise<void> => {
    try {
      const visites = await this. visiteService.getAllVisites();

      res.status(200).json({
        success: true,
        count: visites.length,
        data: visites
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération des visites'
      });
    }
  };

  /**
   * GET /api/visite/:id - Récupérer une visite par ID
   */
  public getVisiteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const visite = await this.visiteService. getVisiteById(req.params.id);

      res. status(200).json({
        success: true,
        data: visite
      });
    } catch (error: any) {
      res. status(500).json({
        success: false,
        message: error.message || 'Visite non trouvée'
      });
    }
  };

  /**
   * GET /api/visite/visiteur/:visiteurId - Récupérer les visites d'un visiteur
   */
  public getVisitesByVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visites = await this.visiteService.getVisitesByVisiteur(req.params. visiteurId);

      res.status(200).json({
        success: true,
        count: visites.length,
        data: visites
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error. message || 'Erreur lors de la récupération des visites du visiteur'
      });
    }
  };

  /**
   * GET /api/visite/praticien/:praticienId - Récupérer les visites d'un praticien
   */
  public getVisitesByPraticien = async (req: Request, res: Response): Promise<void> => {
    try {
      const visites = await this.visiteService.getVisitesByPraticien(req.params. praticienId);

      res.status(200).json({
        success: true,
        count: visites.length,
        data: visites
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération des visites du praticien'
      });
    }
  };
}