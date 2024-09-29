/**
 * Model
 *
 * https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html
 *
 */

import { boolean } from "zod";

const util = require("./util");

export class Model {
  map = {} as Map<string, string>;

  constructor(attributes = {}) {
    //_.defaultsDeep(this, attributes, this.defaults);
  }

  /**
   * Convert a filter defined by react to prisma close where filter
   * @param filters filter as table primereact
   * @returns a structured prisam list
   */
  convFilterReactToPrisma(filters: any): any {
    let j: number = 0;
    const f: any = {};
    // console.log(filters);
    /**
     * Loop over all the filters defined
     */
    for (let field in filters) {
      // Corresponding to field

      // check if field is equal to global in order to manage differently
      if (field !== "global") {
        // Check if field have constraints
        if (filters[field].constraints) {
          const a: any = {};


          // Loop over all the constraints of the field
          for (let k = 0; k < filters[field].constraints.length; k++) {
            // ex ===> constaints 0 { value: null, matchMode: 'equals' }
            console.log(
              "===> constaints for field: " + field + " > " + k,
              filters[field].constraints[k]
            );
            // Value of the constraint
            let obj: any = filters[field].constraints[k].value;
            let matchMode: string = filters[field].constraints[k].matchMode;

            // Check if the constraint value is defined
            if (obj !== null) {
              // check if date
              if (util.isValidDate(obj) && matchMode.startsWith("date")) {
                console.log(
                  "====> Detect Date value for  : " +
                    field +
                    " with value " +
                    obj
                );
                // Ajust Date Time
                let date = util.DateTimeAdjusteTimezone(new Date(obj));
                obj = util.prismaDeclarationDateMatchMode(
                  matchMode,
                  date.toISOString()
                );
                matchMode = util.PRMatchModeToPrisma(matchMode);
              }
              // otherwise is a number of a string
              else if (!isNaN(parseFloat(obj)) && isFinite(obj)) {
                // could have been replace by numIs
                // obj =obj;
              }
              // Check if is a boolean
              // else if (obj instanceof boolean) {
              //   console.log(
              //     "====> Detect boolean value for  : " +
              //       field +
              //       " with value " +
              //       obj
              //   );
              // } else {
              //   console.log(
              //     "=====> Dectect undefined type object to field for " +
              //       field +
              //       " with value " +
              //       obj
              //   );
              // }
              // console.log("S1", v);

              a[matchMode] = obj;
              // console.log("a at k = " + k, a);
            }
            f[field] = a;
            console.log("a at k = " + k, a);
          }

        }
        // SPECIAL FILTERS
        else {
          console.log(
            "===> constaints for field: " +
              field +
              " >  direct constraint " +
              filters[field]
          );
          // Value of the constraint
          let obj: any = filters[field].value;
          let matchMode: string = filters[field].matchMode;
          if (obj !== null) {
            const a: any = {};
            a[matchMode] = obj;
            f[field] = a;
            console.log("f at field: " + field + " > " + f);
          }
        }
      } else {
        // console.log("=====> global filtering");
        // Global filter
        if (filters.global.value !== null) {
          // filtersStr =
          //   " CONCAT('.', e_id, '.', e_entreprise, '.', e_designation, '.', e_builded, '.', 'e_main', '.', 'e_activated', '.', 'e_deleted', '.', 'e_created', '.', 'e_changed')  LIKE '%" +
          //   filters.global.value +
          //   "%' ";
          let globalWhere = this.doGlobalFilter(filters, filters.global.value);
          // console.log("globalWhere", globalWhere);
          f.OR = globalWhere.OR;
          // console.log("f at field: " + field + " > " + f);
        }
      }
      j++;
    }

    console.log("f", f);
    return f;
  }

  /**
   * Allow to convert a sorting list field from primereact to prisma
   * @param multiSortMeta is like reqFilter.multiSortMeta || []
   * @returns a structured sorting list of prisma sorting clause
   */
  convSortingReactToPrisma(multiSortMeta: any): any {
    const t = multiSortMeta.map(({ field, order }: any) => ({
      [field]: order === -1 ? "desc" : "asc",
    }));
    return t;
  }

  doGlobalFilter(filters: any, searchString: string): any {
    // TODO
    let fields: string[] = [];
    for (let field in filters) {
      if (field !== "global") {
        fields.push(field);
      }
    }
    let searchTerms = searchString.split(" ");

    let arr: any[] = [];
    searchTerms.forEach((term) => {
      fields.forEach((field) => {
        // console.log('Filter field: ' + field, filters[field].constraints[0]?.type);
        if (filters[field].constraints[0]?.type === "text") {
          arr.push({ [field]: { contains: term } });
        }
      });
    });

    // console.log("doGlobalFilter", arr);

    return { OR: arr };
    // return {
    //   AND: searchTerms.map((term) => ({
    //     OR: fields.map((field) => ({
    //       [field]: { contains: term },
    //     })),
    //   })),
    // };
  }
}
