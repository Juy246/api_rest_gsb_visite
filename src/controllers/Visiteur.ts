import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';


export class VisiteurController {
  private visiteurService: VisiteurService;

  constructor() {
    this.visiteurService = new VisiteurService();
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
   * POST /api/visiteur/portefeuille/:visiteurId - Ajouter un praticien au portefeuille
   * Body: { praticienId: string }
   */
  public addToPortefeuille = async (req: Request, res: Response): Promise<void> => {
    try {
      const { visiteurId } = req.params;
      const { praticienId } = req.body;

      if (!praticienId) {
        res.status(400).json({
          success: false,
          message: "L'id de praticien est obligatoire"
        });
        return;
      }

      const visiteur = await this.visiteurService.addToPortefeuille(visiteurId, praticienId);

        res.status(200).json({
          success: true,
          message: 'Praticien ajouté au portefeuille avec succès',
          data: visiteur
        });
      } 
      catch (error: any) {
        res.status(400).json({
          success: false,
          message: error.message || "Erreur lors de l'ajout au portefeuille"
        });
    }
  };

}
