import { z } from "zod";

export const TagsCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  table: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .optional()
    .or(z.literal("")),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  machine: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  type: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  memory: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  db: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  byte: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  bit: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  active: z.optional(z.boolean()),

  cycle: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  delta: z.optional(z.boolean()),

  deltaFloat: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  deltaInt: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  deltaBool: z.optional(z.boolean()),

  deltaDateTime: z.date().optional().or(z.literal("")),

  vFloat: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  vInt: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  vBool: z.optional(z.boolean()),

  vStr: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),

  vDateTime: z.date().optional().or(z.literal("")),

  vStamp: z.date().optional().or(z.literal("")),

  counter: z.optional(z.boolean()),

  counterType: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  mesure: z.optional(z.boolean()),

  mesureMin: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  mesureMax: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  measureUnit: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  mqtt_topic: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  webhook: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  laboratory: z.optional(z.boolean()),

  formula: z.optional(z.boolean()),

  formCalculus: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(4096, { message: "Nombre de caractères limité à 4096 !" })
    .optional()
    .or(z.literal("")),

  formProcessing: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  error: z.optional(z.boolean()),

  errorMsg: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  errorStamp: z.date().optional().or(z.literal("")),

  alarmEnable: z.optional(z.boolean()),

  alarm: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .optional()
    .or(z.literal("")),

  persistenceEnable: z.optional(z.boolean()),

  persOffsetEnable: z.optional(z.boolean()),

  persOffsetFloat: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  persOffsetInt: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  persOffsetBool: z.optional(z.boolean()),

  persOffsetDateTime: z.date().optional().or(z.literal("")),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  list: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .optional()
    .or(z.literal("")),
});

export const TagsUpdateSchema = z.object({
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
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  table: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .optional()
    .or(z.literal("")),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  machine: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  type: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  memory: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  db: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  byte: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  bit: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  active: z.optional(z.boolean()),

  cycle: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  delta: z.optional(z.boolean()),

  deltaFloat: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  deltaInt: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  deltaBool: z.optional(z.boolean()),

  deltaDateTime: z.date().optional().or(z.literal("")),

  vFloat: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  vInt: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  vBool: z.optional(z.boolean()),

  vStr: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" })
    .optional()
    .or(z.literal("")),

  vDateTime: z.date().optional().or(z.literal("")),

  vStamp: z.date().optional().or(z.literal("")),

  counter: z.optional(z.boolean()),

  counterType: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  mesure: z.optional(z.boolean()),

  mesureMin: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  mesureMax: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  measureUnit: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  mqtt_topic: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  webhook: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  laboratory: z.optional(z.boolean()),

  formula: z.optional(z.boolean()),

  formCalculus: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(4096, { message: "Nombre de caractères limité à 4096 !" })
    .optional()
    .or(z.literal("")),

  formProcessing: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  error: z.optional(z.boolean()),

  errorMsg: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  errorStamp: z.date().optional().or(z.literal("")),

  alarmEnable: z.optional(z.boolean()),

  alarm: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .optional()
    .or(z.literal("")),

  persistenceEnable: z.optional(z.boolean()),

  persOffsetEnable: z.optional(z.boolean()),

  persOffsetFloat: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  persOffsetInt: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  persOffsetBool: z.optional(z.boolean()),

  persOffsetDateTime: z.date().optional().or(z.literal("")),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  list: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .optional()
    .or(z.literal("")),
});

export const TagsDeleteSchema = z.object({
  // id: z.number(),
});

export const TagsListContentsCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  list: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  content: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  value: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  default: z.optional(z.boolean()),

  width: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  height: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsListContentsUpdateSchema = z.object({
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
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  list: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  content: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  value: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  default: z.optional(z.boolean()),

  width: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  height: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsListContentsDeleteSchema = z.object({
  id: z.number(),
});

export const TagsListCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  type: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  list: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsListUpdateSchema = z.object({
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
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  type: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  list: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsListDeleteSchema = z.object({
  id: z.number(),
});

export const TagsListTypeCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsListTypeUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsListTypeDeleteSchema = z.object({
  id: z.number(),
});

export const TagsMemoriesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45  !" }),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsMemoriesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45  !" }),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsMemoriesDeleteSchema = z.object({
  id: z.number(),
});

export const TagsTablesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  table: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45  !" }),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsTablesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" }),

  deleted: z.optional(z.boolean()),
  created: z.coerce.date().optional(),
  changed: z.coerce.date().optional(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  table: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45  !" }),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  comment: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsTablesDeleteSchema = z.object({
  id: z.number(),
});

export const TagsTypesCreateSchema = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  type: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45  !" }),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  bit: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  byte: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  word: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsTypesUpdateSchema = z.object({
  id: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(1, { message: "Valeur minimale > 0 !" })
    .optional()
    .or(z.literal("")),
  deleted: z.optional(z.boolean()),
  created: z.coerce.date(),
  changed: z.coerce.date(),

  type: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45  !" }),

  designation: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  bit: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  byte: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  word: z
    .number()
    .int({ message: "Définir un nombre !" })
    .min(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  group: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),
});

export const TagsTypesDeleteSchema = z.object({
  id: z.number(),
});
