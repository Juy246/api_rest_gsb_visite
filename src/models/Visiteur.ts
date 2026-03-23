import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur';


export type IVisiteurDocument = IVisiteur & Document & { isJunior: () => boolean };
/**
 * Schéma Mongoose pour Visiteur
 */
const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
    },
    tel: {
      type: String, 
      required: [true, 'Le numéro de téléphone est obligatoire'],
      trim: true,
      unique: true,
      match: [/^(\+33|0)[1-9](\d{2}){4}$/, 'Le numéro de téléphone français est invalide']
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    dateEmbauche: {
      type: Date,
      default: Date.now,
      required: true
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
      minlength: [12, 'Le mot de passe doit contenir au moins 12 caractères'],
      validate: {
        validator: function (value: string) {
          return /[A-Z]/.test(value) && // Majuscule
                 /[a-z]/.test(value) && // Minuscule
                 /\d/.test(value) && // Chiffre
                 /[!@#$%^&*(),.?":{}|<>]/.test(value); // Caractère spécial
        },
        message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
      }
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

visiteurSchema.virtual('visites', {
      ref: 'Visite',
      localField: '_id',
      foreignField: 'visiteurId',
    })

visiteurSchema.methods.isJunior = function (this: IVisiteurDocument): boolean {
  // Si la date d'embauche est null, considérer junior par défaut
  if (this.dateEmbauche === null) return true;
  const now = new Date();
  let isJunior = false;
  if (this.dateEmbauche) {
    const diffInMs = now.getTime() - this.dateEmbauche.getTime(); // Différence en millisecondes
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365); // Convertir en années
    if (diffInYears <= 1) {
      isJunior = true;
    }
  }
  return isJunior;
};

export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>('Visiteur', visiteurSchema);
