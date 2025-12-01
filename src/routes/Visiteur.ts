import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';


/**
 * Configuration des routes pour les utilisateurs
 */
export class VisiteurRoutes {
  public router: Router;
  private visiteurController: VisiteurController;


  constructor() {
    this.router = Router();
    this.visiteurController = new VisiteurController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/visiteur - Créer un utilisateur
    this.router.post('/', this.visiteurController.createVisiteur);
    // GET /api/visiteur - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    // GET /api/visiteur/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);
  }
}
