import type { Float } from "type-fest/source/numeric";
import { z } from "zod";

const FLOAT_NUMBER_SCHEMA = z.number().refine((n) => {
    return !z.number().int().safeParse(n).success && z.number().finite().safeParse(n).success;
}, "should not be an integer");