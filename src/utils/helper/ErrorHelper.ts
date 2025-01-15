/**
 * Enum for common colors.
 * @readonly
 * @enum {{name: string, hex: string}}
 */
export const ErrorType = Object.freeze({
  500: { status: 500, name: "red", hex: "#f00" },
  400: { status: 400, name: "blue", hex: "#00f" },
  200: { status: 200, name: "green", hex: "#0f0" },
});

export const ErrorHelper = {
  /**
   * Get default error message
   * @param status 200 / 400 / 500
   * @returns
   */
  default(status: number): any {
    if (status === 200) {
        return {
          status: 200,
          message: "Success",
          statusText: "Success",
          errors: {},
          issues: [],
          ok: true,
        };
    } else if (status === 400) {
        return {
          status: 400,
          message: "Bad Request",
          statusText: "Bad Request",
          errors: {},
          issues: [],
          ok: false,
        };
    } else {
      return {
        status: 500,
        message: "Internal Server Error",
        statusText: "Internal Server Error",
        errors: {},
        issues: [],
        ok: false,
      };
    }
  },
};
