import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
  type BelongsToManyGetAssociationsMixin,
  type BelongsToManyAddAssociationMixin,
  type BelongsToManyRemoveAssociationMixin,
  type BelongsToManyHasAssociationMixin,
} from "sequelize";
import { sequelize } from "../db/sequelize.js";
import type { Monument } from "./monument.model.js";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare role: CreationOptional<"visitor" | "guide">;
  declare refreshToken: CreationOptional<string | null>;
  declare refreshTokenExpiry: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Association Many-to-Many : User <-> Monument (via Favorite)
  declare getFavoriteMonuments: BelongsToManyGetAssociationsMixin<Monument>;
  declare addFavoriteMonument: BelongsToManyAddAssociationMixin<Monument, number>;
  declare removeFavoriteMonument: BelongsToManyRemoveAssociationMixin<Monument, number>;
  declare hasFavoriteMonument: BelongsToManyHasAssociationMixin<Monument, number>;
  declare favoriteMonuments?: NonAttribute<Monument[]>;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Le nom d'utilisateur est requis." },
        len: { args: [3, 25], msg: "Le nom d'utilisateur doit contenir entre 3 et 25 caractères." },
      },
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: "Le mot de passe est requis." },
            len: { args: [6, 100], msg: "Le mot de passe doit contenir entre 6 et 100 caractères." },
        },
    },
    role: { 
      type: DataTypes.ENUM("visitor", "guide"), 
      allowNull: false, 
      defaultValue: "visitor" 
    },
    refreshToken: { type: DataTypes.TEXT, allowNull: true },
    refreshTokenExpiry: { type: DataTypes.DATE, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize },
);