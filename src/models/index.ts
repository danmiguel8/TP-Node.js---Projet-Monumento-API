import { Monument } from "./monument.model.js";
import { User } from "./user.model.js";
import { Anecdote } from "./anecdote.model.js";
import { Favorite } from "./favorite.model.js";

Monument.hasMany(Anecdote, {
  as: "anecdotes",
  foreignKey: { name: "monumentId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});

Anecdote.belongsTo(Monument, {
  as: "monument",
  foreignKey: { name: "monumentId", allowNull: false },
});

User.belongsToMany(Monument, {
  through: Favorite,
  as: "favoriteMonuments",
  foreignKey: "userId",
  otherKey: "monumentId",
  onDelete: "CASCADE",
});

Monument.belongsToMany(User, {
  through: Favorite,
  as: "fans",
  foreignKey: "monumentId",
  otherKey: "userId",
  onDelete: "CASCADE",
});

Favorite.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Favorite.belongsTo(Monument, { foreignKey: "monumentId", onDelete: "CASCADE" });

export { Monument, User, Anecdote, Favorite };
