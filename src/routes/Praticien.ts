import { Router } from 'express';
import { PraticienController } from '../controllers/Praticien';


/**
 * Configuration des routes pour les utilisateurs
 */
export class PraticienRoutes {
  public router: Router;
  private praticienController: PraticienController;


  constructor() {
    this.router = Router();
    this.praticienController = new PraticienController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/praticien - Créer un utilisateur
    this.router.post('/', this.praticienController.createPraticien);
    // GET /api/praticien - Récupérer tous les praticiens
    this.router.get('/', this.praticienController.getAllPraticiens);
    // GET /api/praticien/:id - Récupérer un praticien par ID
    this.router.get('/:id', this.praticienController.getPraticienById);
  }
}
