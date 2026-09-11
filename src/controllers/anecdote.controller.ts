import type { RequestHandler } from "express";
import { Monument } from "../models/monument.model.js";
import { Anecdote } from "../models/anecdote.model.js";
import { notFoundError } from "../errors/http-error.js";
import { parseIdParam, requireStringField } from "../utils/params.js";

async function getMonumentOr404(rawId: unknown): Promise<Monument> {
  const id = parseIdParam(rawId, "id");
  const monument = await Monument.findByPk(id);
  if (!monument) throw notFoundError(`Le monument avec l'ID ${id} n'a pas été trouvé.`);
  return monument;
}

async function getAnecdoteOr404(rawId: unknown): Promise<Anecdote> {
  const id = parseIdParam(rawId, "id");
  const anecdote = await Anecdote.findByPk(id);
  if (!anecdote) throw notFoundError(`L'anecdote avec l'ID ${id} n'a pas été trouvée.`);
  return anecdote;
}

export const findAllForMonument: RequestHandler = async (req, res) => {
  const monument = await getMonumentOr404(req.params.id);

  const anecdotes = await monument.getAnecdotes({ order: [["createdAt", "DESC"]] });

  res.json({ message: `Anecdotes du monument « ${monument.title} »`, data: anecdotes });
};

export const createForMonument: RequestHandler = async (req, res) => {
  const monument = await getMonumentOr404(req.params.id);
  const content = requireStringField(req.body, "content");

  const anecdote = await monument.createAnecdote({ content });

  res.status(201).json({ message: "Anecdote créée", data: anecdote });
};

export const update: RequestHandler = async (req, res) => {
  const anecdote = await getAnecdoteOr404(req.params.id);
  const content = requireStringField(req.body, "content");

  anecdote.content = content;
  await anecdote.save();

  res.json({ message: "Anecdote mise à jour", data: anecdote });
};

export const remove: RequestHandler = async (req, res) => {
  const anecdote = await getAnecdoteOr404(req.params.id);
  await anecdote.destroy();

  res.json({ message: "Anecdote supprimée", data: null });
};
