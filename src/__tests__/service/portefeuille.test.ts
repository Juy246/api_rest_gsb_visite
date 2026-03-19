jest.mock('../../models/Portefeuille');

import { PortefeuilleService } from '../../services/Portefeuille';
import { PortefeuilleModel } from '../../models/Portefeuille';

describe('Vérifie le nombre de praticiens du portefeuille', () => {
    test('retourne 2 pour un visiteur avec 2 praticiens dans son portefeuille', async () => {
        // ARRANGE
        const portefeuilleService = new PortefeuilleService();
        const visiteurId = '507f1f77bcf86cd799439011';
        const expectedCount = 2;
        
        // Mock countDocuments pour retourner 2
        (PortefeuilleModel.countDocuments as jest.Mock).mockResolvedValue(expectedCount);

        // ACT
        const count = await portefeuilleService.countPraticienPortefeuilleByVisiteur(visiteurId);

        // ASSERT
        expect(count).toBe(expectedCount);
        expect(PortefeuilleModel.countDocuments).toHaveBeenCalledWith({ visiteur: visiteurId });
    });
    test('retourne 0 pour un visiteur sans praticien dans son portefeuille', async () => {
        // ARRANGE
        const portefeuilleService = new PortefeuilleService();
        const visiteurId = '507f1f77bcf86cd799439012';
        const expectedCount = 0;
        
        // Mock countDocuments pour retourner 0
        (PortefeuilleModel.countDocuments as jest.Mock).mockResolvedValue(expectedCount);
        
        // ACT
        const count = await portefeuilleService.countPraticienPortefeuilleByVisiteur(visiteurId);
        
        // ASSERT
        expect(count).toBe(expectedCount);
        expect(PortefeuilleModel.countDocuments).toHaveBeenCalledWith({ visiteur: visiteurId });
    });

});

describe('Vérifie le nombre de praticiens actifs du portefeuille', () => {
    test('retourne le nombre de praticiens actifs pour un visiteur', async () => {
        // ARRANGE
        const portefeuilleService = new PortefeuilleService();
        const visiteurId = '507f1f77bcf86cd799439011';
        const expectedActiveCount = 1;
        
        // Mock countDocuments pour retourner 1 praticien actif
        (PortefeuilleModel.countDocuments as jest.Mock).mockResolvedValue(expectedActiveCount);
        
        // ACT
        const activeCount = await portefeuilleService.countActivePraticienPortefeuilleByVisiteur(visiteurId);

        // ASSERT
        expect(activeCount).toBe(expectedActiveCount);
        expect(PortefeuilleModel.countDocuments).toHaveBeenCalledWith({ visiteur: visiteurId, dateFinSuivi: null });
    });
});
