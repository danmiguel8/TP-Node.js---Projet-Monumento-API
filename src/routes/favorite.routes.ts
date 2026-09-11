import { Router } from "express";
import * as favoriteController from "../controllers/favorite.controller.js";

export const favoriteRouter = Router();

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Liste les monuments favoris de l'utilisateur connecté
 *     tags: [Favoris]
 *     responses:
 *       200:
 *         description: La liste, éventuellement vide
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - properties:
 *                     data:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Monument' }
 *       401:
 *         description: Token manquant ou invalide
 */
favoriteRouter.get("/", favoriteController.findAll);

/**
 * @swagger
 * /favorites/{monumentId}:
 *   post:
 *     summary: Ajoute un monument aux favoris de l'utilisateur connecté
 *     tags: [Favoris]
 *     parameters:
 *       - in: path
 *         name: monumentId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       201:
 *         description: Favori créé
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - properties:
 *                     data: { $ref: '#/components/schemas/Favorite' }
 *       400:
 *         description: Monument déjà présent dans les favoris
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucun monument avec cet identifiant
 */
favoriteRouter.post("/:monumentId", favoriteController.add);

/**
 * @swagger
 * /favorites/{monumentId}:
 *   delete:
 *     summary: Retire un monument des favoris de l'utilisateur connecté
 *     tags: [Favoris]
 *     parameters:
 *       - in: path
 *         name: monumentId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Favori supprimé
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Ce monument n'est pas dans les favoris
 */
favoriteRouter.delete("/:monumentId", favoriteController.remove);
