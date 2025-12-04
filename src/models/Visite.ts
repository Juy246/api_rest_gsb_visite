import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisite } from './interfaces/IVisite';

export type IVisiteDocument = IVisite & Document;

/**
 * Schéma Mongoose pour Visite
 */
const visiteSchema = new Schema<IVisiteDocument>(
  {
    date_visite: {
      type: Date,
      required: [true, 'La date de visite est obligatoire']
    },
    commentaire: {
      type: String,
      trim: true,
      maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
    },
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est obligatoire']
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est obligatoire']
    },
    motif: {
      type: Schema.Types.ObjectId,
      ref: 'Motif',
      required: [true, 'Le motif est obligatoire']
    }
  },
  {
    timestamps: false
  }
);

//index sur visiteurID et praticienID pour optimiser les recherches
visiteSchema.index({ visiteur: 1});
visiteSchema.index({ praticien: 1});

export const VisiteModel: Model<IVisiteDocument> = mongoose.model<IVisiteDocument>('Visite', visiteSchema);