

import { z } from 'zod';



export const entitiesCreateSchema = z.object({
    id: z.number(),
    deleted: z.optional(z.boolean()),
    // created: z.date(),
    // changed: z.date(),
    entity: z.string().min(3, {message: "L'entité doit avoir au moins 3 caractères !"}),
    designation: z.string().min(3, {message: "La désignation doit avoir au moins 3 caractères !"}),
    builded: z.number().int({message: "Spécifier un nombre !"}).min(1900, {message: "Spécifier un nombre supérieur à 1900 !"}).optional(),
    main: z.optional(z.boolean()),
    activated: z.boolean(),
    logoPath: z.optional(z.string().url()),
    location: z.optional(z.string()),
  
});  



export const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});