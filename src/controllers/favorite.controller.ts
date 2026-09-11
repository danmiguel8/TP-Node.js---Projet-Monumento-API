import type { RequestHandler } from "express";
import { Monument } from "../models/monument.model.js";
import { User } from "../models/user.model.js";
import { Favorite } from "../models/favorite.model.js";
import { notFoundError } from "../errors/http-error.js";
import { currentUser } from "../middlewares/require-auth.js";
import { parseIdParam } from "../utils/params.js";

/** GET /favorites — monuments favoris de l'utilisateur connecté. */
export const findAll: RequestHandler = async (req, res) => {
  const { userId } = currentUser(req);

  const user = await User.findByPk(userId);
  if (!user) throw notFoundError("Utilisateur introuvable.");

  const monuments = await user.getFavoriteMonuments({
    joinTableAttributes: [],
    order: [["title", "ASC"]],
  });

  res.json({ message: "Liste de vos monuments favoris", data: monuments });
};

/** POST /favorites/:monumentId */
export const add: RequestHandler = async (req, res) => {
  const { userId } = currentUser(req);
  const monumentId = parseIdParam(req.params.monumentId, "monumentId");

  const monument = await Monument.findByPk(monumentId);
  if (!monument) throw notFoundError(`Le monument avec l'ID ${monumentId} n'a pas été trouvé.`);

  // Un doublon déclenche une UniqueConstraintError -> 400 via errorHandler.
  const favorite = await Favorite.create({ userId, monumentId });

  res.status(201).json({ message: `« ${monument.title} » ajouté à vos favoris`, data: favorite });
};

/** DELETE /favorites/:monumentId */
export const remove: RequestHandler = async (req, res) => {
  const { userId } = currentUser(req);
  const monumentId = parseIdParam(req.params.monumentId, "monumentId");

  const deletedRowsCount = await Favorite.destroy({ where: { userId, monumentId } });
  if (deletedRowsCount === 0) {
    throw notFoundError(`Le monument avec l'ID ${monumentId} n'est pas dans vos favoris.`);
  }

  res.json({ message: "Monument retiré de vos favoris", data: null });
};
