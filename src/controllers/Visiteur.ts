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
      console.log('Données reçues pour la création du visiteur:', req.body);
      const {nom, prenom, email,tel,dateEmbauche} = req.body;

      const visiteurData = {
        nom,
        prenom,
        email,
        tel,
        dateEmbauche
      };
      console.log('Données du visiteur à créer:', visiteurData);
      const visiteur = await this.visiteurService.createVisiteur(visiteurData);
      
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

}
