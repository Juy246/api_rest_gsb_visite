import { UserModel, IUserDocument } from '../models/User';
import { ICreateUser } from '../models/interfaces/IUser';
/**
 * Service pour gérer la logique métier des utilisateurs
 */
export class UserService {
  /**
   * Créer un nouvel utilisateur
   */
  public async createUser(userData: ICreateUser): Promise<IUserDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await UserModel.findOne({ email: userData.email });
     
      if (existingUser) {
        throw new Error(`Un utilisateur avec l'email ${userData.email} existe déjà`);
      }
      // Créer et sauvegarder l'utilisateur
      const user = new UserModel(userData);
      await user.save();
      return user;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }
}
