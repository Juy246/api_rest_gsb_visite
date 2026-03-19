jest.mock('../../models/Visiteur');

import { VisiteurService } from '../../services/Visiteur';
import { VisiteurModel } from '../../models/Visiteur';
import { ICreateVisiteur } from '../../models/interfaces/IVisiteur';

describe('VisiteurService.createVisiteur', () => {
  let service: VisiteurService;
  let visiteurData: ICreateVisiteur;

  beforeEach(() => {
    service = new VisiteurService();
    jest.clearAllMocks();

    visiteurData = {
      nom: 'Dupont',
      prenom: 'Marie',
      email: 'marie.dupont@test.com',
      tel: '0612345678'
    };

  });

  describe('Création d\'un visiteur réussie', () => {
    test('crée un visiteur si email libre et données valides', async () => {
      // ARRANGE
      const expectedVisiteur = {
        ...visiteurData,
        _id: '507f1f77bcf86cd799439011',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Mock findOne :  email n'existe pas
      (VisiteurModel.findOne as jest.Mock).mockResolvedValue(null);

      // Mock constructeur et save
      const mockVisiteurInstance = {
        ...expectedVisiteur,
        save: jest.fn().mockResolvedValue(expectedVisiteur)
      };
      (VisiteurModel as any).mockImplementation(() => mockVisiteurInstance);

      // ACT
      const result = await service.createVisiteur(visiteurData);

      // ASSERT
      expect(result).toBeDefined();
      expect(result.email).toBe('marie.dupont@test.com');
      expect(VisiteurModel.findOne).toHaveBeenCalledWith({ email: 'marie.dupont@test.com' });
      expect(mockVisiteurInstance.save).toHaveBeenCalled();
    });
  });

  describe('Création d\'un visiteur échouée', () => {
    test('échoue si email déjà utilisé', async () => {
      // ARRANGE
      const existingVisiteur = {
        ...visiteurData,
        _id: '507f1f77bcf86cd799439011',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Mock findOne : email existe déjà
      (VisiteurModel.findOne as jest.Mock).mockResolvedValue(existingVisiteur);

      // ACT


      // ASSERT
      await expect(service.createVisiteur(visiteurData)).rejects.toThrow(`Un visiteur avec l'email marie.dupont@test.com existe déjà`);
      expect(VisiteurModel.findOne).toHaveBeenCalledWith({ email: 'marie.dupont@test.com' });
    });


    // Normalement Ici, plutôt un test d'intégration pour valider les règles de validation avant d'arriver au service, mais on peut simuler une ValidationError Mongoose pour tester la gestion des erreurs dans le service
    test('échoue si données invalides', async () => {
      // ARRANGE
      visiteurData.email = 'invalid-email'; // format invalide
      // Mock findOne : email n'existe pas
      (VisiteurModel.findOne as jest.Mock).mockResolvedValue(null);

      // Mock constructeur et save : simule une ValidationError Mongoose
      const mockVisiteurInstance = {
        save: jest.fn().mockRejectedValue({
          name: 'ValidationError',
          errors: {
            email: { message: 'Email invalide' }
          }
        })
      };
      (VisiteurModel as any).mockImplementation(() => mockVisiteurInstance);

      // ASSERT
      await expect(service.createVisiteur(visiteurData)).rejects.toThrow(
        'Validation échouée: Email invalide'
      );
      expect(VisiteurModel.findOne).toHaveBeenCalledWith({ email: 'invalid-email' });

    });

    test('échoue si email trop long', async () => {
      // ARRANGE
      const email = 'a'.repeat(320) + '@test.com'; // 320 caractères = invalide
      visiteurData.email = email;
      // Mock findOne : email n'existe pas
      (VisiteurModel.findOne as jest.Mock).mockResolvedValue(null);

      // Mock constructeur et save : simule une ValidationError Mongoose
      const mockVisiteurInstance = {
        save: jest.fn().mockRejectedValue({
          name: 'ValidationError',
          errors: {
            email: { message: 'L\'email ne doit pas dépasser 320 caractères' }
          }
        })
      };
      (VisiteurModel as any).mockImplementation(() => mockVisiteurInstance);

      // ASSERT
      await expect(service.createVisiteur(visiteurData)).rejects.toThrow(
        'Validation échouée: L\'email ne doit pas dépasser 320 caractères'
      );
      expect(VisiteurModel.findOne).toHaveBeenCalledWith({ email: email });

    });

  });
});