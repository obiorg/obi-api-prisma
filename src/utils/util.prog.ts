/**
 * This will contain useful tool for programming
 */

import { PrismaClient } from "@prisma/client";

let utilProg: PrismaClient;

declare global {
  var __utilProg: PrismaClient | undefined;
}

if (!global.__utilProg) {
  global.__utilProg = new PrismaClient();
}

utilProg = global.__utilProg;

let varExtractor = new RegExp("return (.*);");
export function getVariableName<TResult>(name: () => TResult){
  let m = varExtractor.exec(name + "");
  if(m==null) throw new Error("The function does not contain a statement matching 'return variableName;'");
  return m[1];
}




export { utilProg,  };
