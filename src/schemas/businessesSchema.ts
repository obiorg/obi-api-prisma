import { z } from "zod";

export const BusinessesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  location: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  country: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  state: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  city: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  address1: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  address3: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  bloc: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
  floor: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  number: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
});

export const BusinessesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  location: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  country: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  state: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  city: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  address1: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  address3: z 
    .string() 
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  bloc: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
  floor: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  number: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
});

export const BusinessesDeleteSchema = z.object({
  // id: z.number(),
});


export const CompaniesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  location: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  country: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  state: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  city: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  address1: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  address3: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  bloc: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
  floor: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  number: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
});

export const CompaniesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  location: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  country: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  state: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  city: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  address1: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  address3: z 
    .string() 
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  bloc: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
  floor: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  number: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
});

export const CompaniesDeleteSchema = z.object({
  // id: z.number(),
});



export const EntitiesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  location: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  country: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  state: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  city: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  address1: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  address3: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  bloc: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
  floor: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  number: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
});

export const EntitiesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  location: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  country: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  state: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  city: z
    .number({ message: "valeur requise !" })
    .int({ message: "Définir un nombre !" }),
  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),
  address1: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  address3: z 
    .string() 
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),
  bloc: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
  floor: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  number: z
    .string()
    .min(1, { message: "Définir minimum 1 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
});

export const EntitiesDeleteSchema = z.object({
  // id: z.number(),
});





