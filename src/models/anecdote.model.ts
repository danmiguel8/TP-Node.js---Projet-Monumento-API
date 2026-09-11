import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ForeignKey,
  type NonAttribute,
} from "sequelize";
import { sequelize } from "../db/sequelize.js";
import type { Monument } from "./monument.model.js";

export class Anecdote extends Model<InferAttributes<Anecdote>, InferCreationAttributes<Anecdote>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare monumentId: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare monument?: NonAttribute<Monument>;
}

Anecdote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Le contenu de l'anecdote est obligatoire." },
        notEmpty: { msg: "Le contenu de l'anecdote ne peut pas être vide." },
        len: {
          args: [10, 2000],
          msg: "Le contenu de l'anecdote doit contenir entre 10 et 2000 caractères.",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize },
);
