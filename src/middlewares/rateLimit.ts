import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Middleware de limitation de taux pour les requêtes
 * Permet de limiter le nombre de requêtes qu'un utilisateur peut faire dans une période donnée
 * Limite à 5 requêtes toutes les 15 minutes par adresse IP
 */
export const requestLimiter:RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite chaque IP à 5 requêtes
  standardHeaders: true, // Retourne les informations de limitation de taux
  legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*`
  message: {
    status: 429,
    error: 'Trop de requêtes, veuillez réessayer plus tard.'
  },

  //Skip le trusted IPs pour certains IPs 
  skip: (req) => {
    const trustedIPs = process.env.TRUSTED_IPS?.split(',') || [];
    return trustedIPs.includes(req.ip || '');
  }
});

export default requestLimiter;