import { Router } from "express";
import * as anecdoteController from "../controllers/anecdote.controller.js";

export const anecdoteRouter = Router();

/**
 * @swagger
 * /anecdotes/{id}:
 *   put:
 *     summary: Modifie une anecdote
 *     tags: [Anecdotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnecdoteInput'
 *     responses:
 *       200:
 *         description: Anecdote mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - properties:
 *                     data: { $ref: '#/components/schemas/Anecdote' }
 *       400:
 *         description: Contenu absent ou invalide (10 à 2000 caractères)
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune anecdote avec cet identifiant
 */
anecdoteRouter.put("/:id", anecdoteController.update);

/**
 * @swagger
 * /anecdotes/{id}:
 *   delete:
 *     summary: Supprime une anecdote
 *     tags: [Anecdotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Anecdote supprimée
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Aucune anecdote avec cet identifiant
 */
anecdoteRouter.delete("/:id", anecdoteController.remove);
