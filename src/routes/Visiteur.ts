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

    // -- Gestion du portefeuille --
    // POST /api/visiteur/:id/portefeuille - Ajouter un praticien au portefeuille d'un visiteur
    this.router.post('/:id/portefeuille', this.visiteurController.addPraticienToPortefeuille);
    // GET /api/visiteur/:id/portefeuille - Récupérer le portefeuille d'un visiteur
    this.router.get('/:id/portefeuille', this.visiteurController.getPortefeuilleByVisiteurId);
    // DELETE /api/visiteur/:id/portefeuille/:praticienId - Supprimer un praticien du portefeuille d'un visiteur
    this.router.delete('/:visiteurId/portefeuille/:praticienId', this.visiteurController.deletePraticienById);
    // PATCH /api/visiteur/:id/portefeuille - Arreter le suivi d'un praticien dans le portefeuille d'un visiteur
    this.router.patch('/:id/portefeuille', this.visiteurController.stopSuiviPraticien);
    // GET /api/visiteur/:id/portefeuille/actif - Récupérer les portefeuilles actifs d'un visiteur
    this.router.get('/:id/portefeuille/actif', this.visiteurController.getActivePortefeuilleByVisiteur);
  }
}
