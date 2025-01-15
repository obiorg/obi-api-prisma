import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodIssue } from "zod";

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
    // console.log("Validation body", req.body);

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
    } else {
      next();
    }
  };
}

export function validateSchema(
  schema: z.ZodObject<any, any> | z.ZodUnion<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        ...req.body,
      });

      if (!result.success) {
        //export declare type ZodIssue = ZodIssueOptionalMessage & {
        //     fatal?: boolean;
        //     message: string;
        // };
        // console.log("Schéma validation ", result.error);

        let err = {
          // The flatten method is used to convert the validation errors into a flat object structure
          // that can be easily displayed in the form.
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          statusText: "INTERNAL_SERVER_ERROR",
          ok: false,
          errors: result.error.flatten().fieldErrors,
          issues: result.error.issues,
        };

        console.log("Error flattent", err);
        // return err;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      } else {
        next();
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log("error >", err.errors);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.errors);
      }
    }
  };
}

export function validateSchemas(
  schema: z.ZodObject<any, any> | z.ZodUnion<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    // console.log("Validation body", req.body);

    let out: any = [];
    let errCnt = 0;
    for (let i = 0; i < req.body.length; i++) {
      const resultForOne = schema.safeParse(req.body[i]);
      let err = {};
      if (!resultForOne.success) {
        // console.log("result ", resultForOne);
        // console.log("result ", resultForOne.error);
        err = resultForOne.error.flatten().fieldErrors;
        errCnt++;
      }
      out.push({
        index: i,
        errors: err,
      });
    }

    // If validation fails, return the errors
    if (errCnt > 0) {
      const err = {
        // The flatten method is used to convert the validation errors into a flat object structure
        // that can be easily displayed in the form.
        errors: out, //.flatten().fieldErrors,
      };
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    } else {
      next();
    }
  };
}
