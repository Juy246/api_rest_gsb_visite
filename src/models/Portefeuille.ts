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
      required: [true, 'La date de début de suivi est obligatoire']
    },
    dateFinSuivi: {
      type: Date,
      required: false
    },
    visiteurId: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est obligatoire']
    },
    praticienId: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est obligatoire']
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


export const PortefeuilleModel: Model<IPortefeuilleDocument> = mongoose.model<IPortefeuilleDocument>('Portefeuille', portefeuilleSchema);