import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}

export function entityValidate(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Validation body", req.body);

    const result = schema.safeParse({
      ...req.body,
    });
    // console.log("result ", result);
    // console.log("result ", result.error);
    // If validation fails, return the errors
    if (!result.success) {
      const err = {
        // The flatten method is used to convert the validation errors into a flat object structure
        // that can be easily displayed in the form.
        errors: result.error.flatten().fieldErrors,
      };
      // return err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }else{
        next();
    }
  };
}

export function validateSchema(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Validation body", req.body);

    const result = schema.safeParse({
      ...req.body,
    });
    // console.log("result ", result);
    // console.log("result ", result.error);
    // If validation fails, return the errors
    if (!result.success) {
      const err = {
        // The flatten method is used to convert the validation errors into a flat object structure
        // that can be easily displayed in the form.
        errors: result.error.flatten().fieldErrors,
      };
      // return err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }else{
        next();
    }
  };
}
