import { Router } from 'express';
import { UserController } from '../controllers/User';


/**
 * Configuration des routes pour les utilisateurs
 */
export class UserRoutes {
  public router: Router;
  private userController: UserController;


  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/visiteur - Créer un utilisateur
    this.router.post('/', this.userController.createUser);
  }
}
