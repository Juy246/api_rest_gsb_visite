import { VisiteurModel } from '../../models/Visiteur';
import { ICreateVisiteur } from '../../models/interfaces/IVisiteur';

describe('VisiteurModel.isJunior()', () => {
	let visiteurData: Partial<ICreateVisiteur> & { dateEmbauche?: Date | null };

	beforeEach(() => {
		visiteurData = {
            nom: 'Dupont',
            prenom: 'Marie',
            email: 'marie.dupont@test.com',
            tel: '0612345678',
			dateEmbauche: new Date(),
		};
	});

    describe('Veirifie si un visiteur est junior', () => {
        test("retourne true si embauché il y a moins d'un an", () => {
            const visiteurJunior = new VisiteurModel({
                ...visiteurData,
                dateEmbauche: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) // Calcule: 6 mois * 30 jours * 24h * 60min * 60s * 1000ms
            });
            const result = visiteurJunior.isJunior();
            expect(result).toBe(true);
        });

            test("retourne false si embauché il y a plus d'un an", () => {
            const visiteurSenior = new VisiteurModel({
                ...visiteurData,
                dateEmbauche: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000) // Calcule: 2 ans * 365 jours * 24h * 60min * 60s * 1000ms
            });
            const result = visiteurSenior.isJunior();
            expect(result).toBe(false);
        });

        test("retourne true si pas de date d'embauche (null)", () => {
            const visiteurSansDate = new VisiteurModel({
                ...visiteurData,
                dateEmbauche: null
            });
            const result = visiteurSansDate.isJunior();
            expect(result).toBe(true);
        });
    });
});