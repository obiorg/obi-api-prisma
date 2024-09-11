import { z } from "zod";

export const EntitiesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  entity: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  builded: z
    .number()
    .int({ message: "Spécifier un nombre !" })
    .min(1900, { message: "Spécifier un nombre supérieur à 1900 !" })
    .optional(),
  main: z.optional(z.boolean()),
  activated: z.optional(z.boolean()),
  logoPath: z.optional(z.string().url()),
  location: z.optional(z.string()),
});

export const EntitiesUpdateSchema = z.object({
  id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  entity: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  builded: z
    .number()
    .int({ message: "Spécifier un nombre !" })
    .min(1900, { message: "Spécifier un nombre supérieur à 1900 !" })
    .optional(),
  main: z.optional(z.boolean()),
  activated: z.optional(z.boolean()),
  logoPath: z.optional(z.string().url()),
  location: z.optional(z.string()),
});

export const EntitiesDeleteSchema = z.object({
  id: z.number(),
});
