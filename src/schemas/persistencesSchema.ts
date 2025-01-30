import { z } from "zod";

export const PersistencesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  tag: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  method: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 1 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  // created: z.coerce.date(),
  // changed: z.coerce.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  tag: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  method: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesDeleteSchema = z.object({
  // id: z.number(),
});

export const PersistencesStandardsLimitsCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  tag: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  method: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesStandardsLimitsUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  company: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  tag: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  method: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesStandardsLimitsDeleteSchema = z.object({
  // id: z.number(),
});

export const PersistencesMethodsCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  tag: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  method: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesMethodsUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  company: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  tag: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  method: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesMethodsDeleteSchema = z.object({
  // id: z.number(),
});

export const PersistencesStandardsCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" }),

  tag: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" }),

  vFloat: z
    .number()
    .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON, {
      message: "Définir un nombre à virgule !",
    })
    .optional()
    .or(z.literal("")),

  vInt: z
    .number()
    .int({ message: "Définir un nombre entier !" })
    .optional()
    .or(z.literal("")),

  vBool: z
    .boolean({ message: "Définir une valeur boolean !" })
    .optional()
    .or(z.literal("")),

  vStr: z
    .string()
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),

  vDateTime: z
    .string()
    .datetime({ message: "Spécifier une date" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesStandardsUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  company: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  tag: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  method: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  activate: z.optional(z.boolean()),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
});

export const PersistencesStandardsDeleteSchema = z.object({
  // id: z.number(),
});
