import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';
import { PortefeuilleService } from '../services/Portefeuille';


export class VisiteurController {
  private visiteurService: VisiteurService;
  private portefeuilleService: PortefeuilleService;

  constructor() {
    this.visiteurService = new VisiteurService();
    this.portefeuilleService = new PortefeuilleService();
  }


  /**
   * POST /api/visiteur - Créer un visiteur
   */
  public createVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.createVisiteur(req.body);
     
      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };

  /**
 * GET /api/visiteurs - Récupérer tous les visiteurs
 */
  public getAllVisiteurs = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurs = await this.visiteurService.getAllVisiteurs();

      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération des visiteurs'
      });
    }
  };

  /**
 * GET /api/visiteur/:id - Récupérer un visiteur par ID
 */
  public getVisiteurById = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id);

      res.status(200).json({
        success: true,
        data: visiteur
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Visiteur non trouvé'
      });
    }
  };

  /**
   * POST /api/visiteur/:id/portefeuille - Ajouter un praticien au portefeuille d'un visiteur
   */
  public addPraticienToPortefeuille = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id;
      const praticienId = req.body.praticienId;

      const portefeuille = await this.portefeuilleService.addPraticienToPortefeuille({
        visiteur: visiteurId,
        praticien: praticienId,
        dateDebutSuivi: new Date()
      });
      
      res.status(201).json({
        success: true,
        message: 'Praticien ajouté au portefeuille avec succès',
        data: portefeuille
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de l\'ajout du praticien au portefeuille'
      });
    }
  }

  /**
   * GET /api/visiteur/:id/portefeuille - Récupérer le portefeuille d'un visiteur
   */
  public getPortefeuilleByVisiteurId = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id;

      const portefeuille = await this.portefeuilleService.getPortefeuillesByVisiteurId(visiteurId);
      
      res.status(200).json({
        success: true,
        data: portefeuille
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération du portefeuille'
      });
    }
  }

  // DELETE /visiteurs/:visiteurId/portefeuille/:praticienId
  public deletePraticienById = async (req: Request, res: Response) => {
    try {
      const { visiteurId, praticienId } = req.params;
      await this.portefeuilleService.deletePraticienById(visiteurId, praticienId);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // PATCH /visiteurs/:id/portefeuille
  public stopSuiviPraticien = async (req: Request, res: Response) => {
    try {
      const visiteurId = req.params.id;
      const { praticienId } = req.body;
      await this.portefeuilleService.stopSuiviPraticien(visiteurId, praticienId);
      res.status(200).json({
        success: true,
        message: 'Suivi du praticien arrêté avec succès'
        });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET /visiteurs/:id/portefeuille/actif
  public getActivePortefeuilleByVisiteur = async (req: Request, res: Response) => {
    try {
      const visiteurId = req.params.id;
      const activePortefeuilles = await this.portefeuilleService.getActivePortefeuilleByVisiteur(visiteurId);
      res.status(200).json({
        success: true,
        data: activePortefeuilles
      });
    }
    catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
