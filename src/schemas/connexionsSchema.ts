import { z } from "zod";

export const MachinesDriversCreateSchema = z.object({
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

export const MachinesDriversUpdateSchema = z.object({
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

export const MachinesDriversDeleteSchema = z.object({
  // id: z.number(),
});

/**
 * Manage when define address as machine reference
 */
export const MachinesCreateSchemaAddr = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  address: z
    .string()
    .ip({ version: "v4" })
    .min(3, { message: "IPv4 invalid !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),

  mask: z
    .string()
    .ip({ version: "v4" })
    .min(3, { message: "Mask invalid !" })
    .max(15, { message: "Nombre de caractères limité à 15 !" }),

  dns: z
    .string()
    .ip({ version: "v4" })
    .min(3, { message: "DNS invalid !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  ipv6: z
    .string()
    .ip({ version: "v6" })
    .min(3, { message: "IPv6 invalid !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  port: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  rack: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .min(0, { message: "Valeur minimale >= 0 !" }),
  // .optional()
  // .or(z.literal("")),

  slot: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .min(0, { message: "Valeur minimale >= 0 !" }),
  // .optional()
  // .or(z.literal("")),

  driver: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  mqtt: z.boolean().default(false),

  // mqtt_user: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(45, { message: "Nombre de caractères limité à 45 !" })
  //   .optional()
  //   .or(z.literal("")),

  // mqtt_password: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),

  // webhook: z.optional(z.boolean()),

  // webhook_secret: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),

  // bus: z
  //   .number()
  //   .int({ message: "Définir un nombre !" })
  //   .min(1, { message: "Valeur minimale >= 0 !" })
  //   .optional()
  //   .or(z.literal("")),

  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const MachinesCreateSchemaMQTT = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),
  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // mask: z.literal(""),
  // dns: z.literal(""),
  // ipv6: z.literal(""),
  // port: z.literal(0),
  // name: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(255, { message: "Nombre de caractères limité à 255 !" }),
  // rack: z.literal(0),
  // slot: z.literal(0),
  // driver: z.literal(0),
  mqtt: z.literal(true),
  mqtt_user: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  mqtt_password: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // webhook: z.optional(z.boolean()),
  // webhook_secret: z.literal(""),
  // bus: z.literal(""),
  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const MachinesCreateSchemaWebhook = z.object({
  // // id: z.number(),
  // deleted: z.optional(z.boolean()),
  // // created: z.date(),
  // // changed: z.date(),
  // company: z
  //   .number({ message: "Valeur requise !" })
  //   .int({ message: "Définir un nombre !" }),
  // address: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // mask: z.literal(""),
  // dns: z.literal(""),
  // ipv6: z.literal(""),
  // port: z.literal(0),
  // name: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(255, { message: "Nombre de caractères limité à 255 !" }),
  // rack: z.literal(0),
  // slot: z.literal(0),
  // driver: z.literal(0),
  // mqtt: z.optional(z.boolean()),
  // mqtt_user: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(45, { message: "Nombre de caractères limité à 45 !" })
  //   .optional()
  //   .or(z.literal("")),
  // mqtt_password: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),
  // webhook: z.literal(true, { message: "Valeur active attendue !" }),
  // webhook_secret: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // bus: z.literal(""),
  // description: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),
});

export const MachinesCreateSchemaBus = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),

  mask: z.literal(""),
  dns: z.literal(""),
  ipv6: z.literal(""),

  port: z.literal(0),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  rack: z.literal(0),

  slot: z.literal(0),

  driver: z.literal(0),

  mqtt: z.optional(z.boolean()),

  mqtt_user: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  webhook: z.optional(z.boolean()),

  webhook_secret: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  bus: z
    .number()
    .int({ message: "Définir un nombre !" })
    .gte(1, { message: "Valeur minimale >= 1 !" })
    .min(1, { message: "Valeur minimale >= 1 !" }),

  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const MachinesCreateSchema = z.union([
  MachinesCreateSchemaAddr,
  MachinesCreateSchemaMQTT,
  // MachinesCreateSchemaWebhook,
  // MachinesCreateSchemaBus,
]);

/**
 * Manage when define address as machine reference
 */
export const MachinesUpdateSchemaAddr = z.object({
  id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  address: z
    .string()
    .ip({ version: "v4" })
    .min(3, { message: "IPv4 invalid !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),

  mask: z
    .string()
    .ip({ version: "v4" })
    .min(3, { message: "Mask invalid !" })
    .max(15, { message: "Nombre de caractères limité à 15 !" }),

  dns: z
    .string()
    .ip({ version: "v4" })
    .min(3, { message: "DNS invalid !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  ipv6: z
    .string()
    .ip({ version: "v6" })
    .min(3, { message: "IPv6 invalid !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  port: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .optional()
    .or(z.literal("")),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  rack: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .min(0, { message: "Valeur minimale >= 0 !" }),
  // .optional()
  // .or(z.literal("")),

  slot: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" })
    .gte(0, { message: "Valeur minimale >= 0 !" })
    .min(0, { message: "Valeur minimale >= 0 !" }),
  // .optional()
  // .or(z.literal("")),

  driver: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  mqtt: z.boolean().default(false),

  // mqtt_user: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(45, { message: "Nombre de caractères limité à 45 !" })
  //   .optional()
  //   .or(z.literal("")),

  // mqtt_password: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),

  // webhook: z.optional(z.boolean()),

  // webhook_secret: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),

  // bus: z
  //   .number()
  //   .int({ message: "Définir un nombre !" })
  //   .min(1, { message: "Valeur minimale >= 0 !" })
  //   .optional()
  //   .or(z.literal("")),

  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const MachinesUpdateSchemaMQTT = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),
  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // mask: z.literal(""),
  // dns: z.literal(""),
  // ipv6: z.literal(""),
  // port: z.literal(0),
  // name: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(255, { message: "Nombre de caractères limité à 255 !" }),
  // rack: z.literal(0),
  // slot: z.literal(0),
  // driver: z.literal(0),
  mqtt: z.literal(true),
  mqtt_user: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" }),
  mqtt_password: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // webhook: z.optional(z.boolean()),
  // webhook_secret: z.literal(""),
  // bus: z.literal(""),
  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const MachinesUpdateSchemaWebhook = z.object({
  // // id: z.number(),
  // deleted: z.optional(z.boolean()),
  // // created: z.date(),
  // // changed: z.date(),
  // company: z
  //   .number({ message: "Valeur requise !" })
  //   .int({ message: "Définir un nombre !" }),
  // address: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // mask: z.literal(""),
  // dns: z.literal(""),
  // ipv6: z.literal(""),
  // port: z.literal(0),
  // name: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(255, { message: "Nombre de caractères limité à 255 !" }),
  // rack: z.literal(0),
  // slot: z.literal(0),
  // driver: z.literal(0),
  // mqtt: z.optional(z.boolean()),
  // mqtt_user: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(45, { message: "Nombre de caractères limité à 45 !" })
  //   .optional()
  //   .or(z.literal("")),
  // mqtt_password: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),
  // webhook: z.literal(true, { message: "Valeur active attendue !" }),
  // webhook_secret: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" }),
  // bus: z.literal(""),
  // description: z
  //   .string()
  //   .min(3, { message: "Définir minimum 3 caractères !" })
  //   .max(512, { message: "Nombre de caractères limité à 512 !" })
  //   .optional()
  //   .or(z.literal("")),
});

export const MachinesUpdateSchemaBus = z.object({
  // id: z.number(),
  deleted: z.optional(z.boolean()),
  // created: z.date(),
  // changed: z.date(),

  company: z
    .number({ message: "Valeur requise !" })
    .int({ message: "Définir un nombre !" }),

  address: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" }),

  mask: z.literal(""),
  dns: z.literal(""),
  ipv6: z.literal(""),

  port: z.literal(0),

  name: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(255, { message: "Nombre de caractères limité à 255 !" }),

  rack: z.literal(0),

  slot: z.literal(0),

  driver: z.literal(0),

  mqtt: z.optional(z.boolean()),

  mqtt_user: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(45, { message: "Nombre de caractères limité à 45 !" })
    .optional()
    .or(z.literal("")),

  webhook: z.optional(z.boolean()),

  webhook_secret: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),

  bus: z
    .number()
    .int({ message: "Définir un nombre !" })
    .gte(1, { message: "Valeur minimale >= 1 !" })
    .min(1, { message: "Valeur minimale >= 1 !" }),

  description: z
    .string()
    .min(3, { message: "Définir minimum 3 caractères !" })
    .max(512, { message: "Nombre de caractères limité à 512 !" })
    .optional()
    .or(z.literal("")),
});

export const MachinesUpdateSchema = z.union([
  MachinesCreateSchemaAddr,
  MachinesCreateSchemaMQTT,
  // MachinesCreateSchemaWebhook,
  // MachinesCreateSchemaBus,
]);

export const MachinesDeleteSchema = z.object({
  // id: z.number(),
});
