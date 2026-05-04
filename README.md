# API REST GSB Visite

Une API REST pour gérer, centraliser, visualiser les comptes-rendus de visite du laboratoire GSB.
[Application mobile Android](https://github.com/Juy246/GSB_visite)

## Caractéristiques

- Gestion des visiteurs
- Authentification JWT
- Gestion des praticiens
- Suivi des portefeuilles de clients
- Enregistrement des visites
- Sécurité HTTP renforcée (Helmet)
- Limitation de débit API (Rate limiting)
- Validation des données
- Tests unitaires (Jest)


## Configuration

**Dans le fichier .env**

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Configuration MongoDB Atlas
DB_USERNAME="db_username"
DB_PASSWORD="db_password"
DB_NAME="db_name"

# Configuration JWT
JWT_SECRET="votre_passphrase_secrete"

```

### Démarrer le serveur

```bash
# Installer les dépendances
npm install

# En développement
npm run dev

# En production
npm run build
npm start
```

### Tester l'API

```bash
# Vérifier que l'API fonctionne
curl http://localhost:3000/

# Check de santé
curl http://localhost:3000/health
```

### Exécuter les tests

```bash
npm test
```

## Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/visiteur/signup` | Créer un compte visiteur |
| POST | `/api/visiteur/login` | Se connecter |
| GET | `/api/visiteur` | Lister tous les visiteurs |
| GET | `/api/praticien` | Lister tous les praticiens |
| POST | `/api/visite` | Enregistrer une visite |
| GET | `/api/visite` | Lister toutes les visites |
| POST | `/api/visiteur/:id/portefeuille` | Ajouter un praticien |
| GET | `/api/visiteur/:id/portefeuille/actif` | Portefeuille actif |

## Authentification

L'API utilise JWT (JSON Web Tokens) pour sécuriser les endpoints.

### Flux d'authentification

1. **Inscription/Connexion**
   ```bash
   POST /api/visiteur/signup
   POST /api/visiteur/login
   ```

2. **Utiliser le token**
   ```bash
   Authorization: Bearer <votre_token_jwt>
   ```

3. **Endpoints protégés**
   - `GET /api/visiteur` (requiert authentification)

## Structure du projet

```
src/
├── server.ts                    # Point d'entrée
├── config/database.ts           # Configuration MongoDB
├── models/                      # Modèles Mongoose
│   ├── Visiteur.ts
│   ├── Praticien.ts
│   ├── Visite.ts
│   ├── Motif.ts
│   ├── Portefeuille.ts
│   └── interfaces/
├── controllers/                 # Logique des routes
│   ├── Visiteur.ts
│   ├── Praticien.ts
│   ├── Visite.ts
│   └── Motif.ts
├── services/                    # Logique métier
│   ├── Visiteur.ts
│   ├── Praticien.ts
│   ├── Visite.ts
│   ├── Motif.ts
│   └── Portefeuille.ts
├── routes/                      # Définition des routes
│   ├── Visiteur.ts
│   ├── Praticien.ts
│   ├── Visite.ts
│   └── Motif.ts
├── middlewares/                 # Middlewares Express
│   ├── auth.ts
│   ├── dataValidation.ts
│   └── rateLimit.ts
├── validators/                  # Validation des données
│   └── Visiteur.ts
├── types/                       # Types TypeScript
│   └── authenticatedRequest.ts
└── __tests__/                   # Tests unitaires
    ├── model/
    ├── service/
    └── sample.test.ts
```

## Dépendances principales

- **Express 5.2.1** - Framework web
- **TypeScript 5.9.3** - Langage typé
- **Mongoose 9.3.1** - ODM MongoDB
- **JWT** - Authentification sécurisée
- **bcrypt** - Hash de mots de passe
- **Helmet** - Sécurité HTTP
- **Jest** - Tests unitaires

## Exemple d'utilisation

### Créer un compte

```bash
curl -X POST http://localhost:3000/api/visiteur/signup \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@gsb.com",
    "tel": "0612345678",
    "password": "Password123!"
  }'
```

### Se connecter

```bash
curl -X POST http://localhost:3000/api/visiteur/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@gsb.com",
    "password": "Password123!"
  }'
```

### Récupérer les visiteurs (authentifié)

```bash
curl -X GET http://localhost:3000/api/visiteur \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Dépannage

### L'API ne démarre pas

```bash
# Vérifier que MongoDB est en cours d'exécution
# Vérifier les variables d'environnement dans .env
# Consulter les logs
npm run dev
```

### Erreur de connexion à MongoDB

- Vérifier les credentials `DB_USERNAME` et `DB_PASSWORD`
- Vérifier que l'adresse IP est autorisée dans MongoDB Atlas
- Vérifier le nom de la base de données `DB_NAME`

### Tests qui échouent

```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
npm test
```

## Licence

ISC - Voir LICENSE
