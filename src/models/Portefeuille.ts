import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPortefeuille } from './interfaces/IPortefeuille';


export type IPortefeuilleDocument = IPortefeuille & Document;
/**
 * Schéma Mongoose pour Portefeuille
 */
const portefeuilleSchema = new Schema<IPortefeuilleDocument>(
  {
    dateDebutSuivi: {
      type: Date,
      default: Date.now,
      required: [true, 'La date de début de suivi est obligatoire']
    },
    dateFinSuivi: {
      type: Date,
      required: false
    },
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, "L'Id du visiteur est obligatoire"]
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, "L'Id du praticien est obligatoire"]
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

portefeuilleSchema.virtual('visites', {
      ref: 'Visite',
      localField: '_id',
      foreignField: 'portefeuilleId',
    })

    // Index sur visiteurId et praticienId pour optimiser les recherches
portefeuilleSchema.index({ visiteurId: 1, dateDebutSuivi: -1 });
portefeuilleSchema.index({ praticienId: 1, dateDebutSuivi: -1 });

export const PortefeuilleModel: Model<IPortefeuilleDocument> = mongoose.model<IPortefeuilleDocument>('Portefeuille', portefeuilleSchema);