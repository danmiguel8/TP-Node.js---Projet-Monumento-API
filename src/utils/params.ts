import { badRequestError } from "../errors/http-error.js";

export function parseIdParam(raw: unknown, label = "id"): number {
  const value = typeof raw === "string" ? Number(raw) : Number.NaN;
  if (!Number.isInteger(value) || value <= 0) {
    throw badRequestError(`Le paramètre ${label} doit être un entier positif.`);
  }
  return value;
}

export function requireStringField(body: unknown, field: string): string {
  if (!body || typeof body !== "object") {
    throw badRequestError("Le corps de la requête doit être un objet JSON.");
  }

  const value = (body as Record<string, unknown>)[field];
  if (typeof value !== "string") {
    throw badRequestError(`Le champ ${field} est obligatoire et doit être une chaîne de caractères.`);
  }

  return value;
}
