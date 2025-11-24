import { Request, Response } from 'express';
import { UserService } from '../services/User';


export class UserController {
  private userService: UserService;


  constructor() {
    this.userService = new UserService();
  }


  /**
   * POST /api/visiteur - Créer un utilisateur
   */
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
     
      res.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: user
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };
}
