

import { z } from 'zod';



export const LocationsCreateSchema = z.object({
    
    // id: z.number(),
    deleted: z.optional(z.boolean()),
    // created: z.date(),
    // changed: z.date(),

    location: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(45, {message: "Nombre de caractères limité à 45 !"}),
    designation: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(255, {message: "Nombre de caractères limité à 255 !"}),
    group: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(45, {message: "Nombre de caractères limité à 45 !"}),

    country: z.number().int({message: "Définir un nombre !"}),
    state: z.number().int({message: "Définir un nombre !"}),
    city: z.number().int({message: "Définir un nombre !"}),
    address: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(255, {message: "Nombre de caractères limité à 255 !"}),
    address1: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(255, {message: "Nombre de caractères limité à 255 !"}),
    address3: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(255, {message: "Nombre de caractères limité à 255 !"}),
    bloc: z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(45, {message: "Nombre de caractères limité à 45 !"}),
    floor: z.number().int({message: "Définir un nombre !"}).min(1, {message: "Valeur minimale >= 1 !"}),
    number:z.string().min(3, {message: "Définir minimum 3 caractères !"}).max(45, {message: "Nombre de caractères limité à 45 !"}),
    
  
});  

