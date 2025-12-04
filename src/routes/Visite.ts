import { Router } from 'express';
import { VisiteController } from '../controllers/Visite';

/**
 * Configuration des routes pour les visites
 */
export class VisiteRoutes {
  public router: Router;
  private visiteController: VisiteController;

  constructor() {
    this.router = Router();
    this.visiteController = new VisiteController();
    this. initializeRoutes();
  }

  private initializeRoutes(): void {
    // POST /api/visite - Créer une visite
    this.router. post('/', this. visiteController.  createVisite);
    // GET /api/visite - Récupérer toutes les visites
    this.router.get('/', this.visiteController.  getAllVisites);
    // GET /api/visite/visiteur/:visiteurId - Récupérer les visites d'un visiteur
    this.router.get('/visiteur/:visiteurId', this.visiteController.getVisitesByVisiteur);
    // GET /api/visite/praticien/:praticienId - Récupérer les visites d'un praticien
    this.router.get('/praticien/:praticienId', this.visiteController. getVisitesByPraticien);
    // GET /api/visite/:id - Récupérer une visite par ID
    this. router.get('/:id', this.visiteController.  getVisiteById);
  }
}