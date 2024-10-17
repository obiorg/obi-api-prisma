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
            // console.log(
            //   "===> constaints for field: " + field + " > " + k,
            //   filters[field].constraints[k]
            // );
            // Value of the constraint
            let obj: any = filters[field].constraints[k].value;
            let matchMode: string = filters[field].constraints[k].matchMode;
            let type: string = filters[field]?.constraints[k]?.type;

            // Check if the constraint value is defined
            if (obj !== null) {
              // check if date
              if (util.isValidDate(obj) && matchMode.startsWith("date")) {
                // console.log(
                //   "====> Detect Date value for  : " +
                //     field +
                //     " with value " +
                //     obj
                // );
                // Ajust Date Time
                let date = util.DateTimeAdjusteTimezone(new Date(obj));
                obj = util.prismaDeclarationDateMatchMode(
                  matchMode,
                  date.toISOString()
                );
                matchMode = util.PRMatchModeToPrisma(matchMode);
              }
              // otherwise is a number of a string
              // else if (!isNaN(parseFloat(obj)) && isFinite(obj)) {
              else if (type === "numeric") {
                // could have been replace by numIs
                obj = parseFloat(obj);
              }
              // Check if is a boolean
              else if (obj instanceof boolean) {
                console.log(
                  "====> Detect boolean value for  : " +
                    field +
                    " with value " +
                    obj
                );
              } else {
                console.error(
                  "=====> Dectect undefined type object to field for " +
                    field +
                    " with value " +
                    obj + 
                    " with type " + type

                );
              }
              // console.log("S1", v);

              a[matchMode] = obj;
              // console.log("a at k = " + k, a);
            }
            f[field] = a;
            // console.log("a at k = " + k, a);
          }
        }
        // SPECIAL FILTERS
        else {
          // console.log(
          //   "===> constaints for field: " +
          //     field +
          //     " >  direct constraint " +
          //     filters[field]
          // );
          // Value of the constraint
          let obj: any = filters[field].value;
          let matchMode: string = filters[field].matchMode;
          if (obj !== null) {
            const a: any = {};
            a[matchMode] = obj;
            f[field] = a;
            // console.log("f at field: " + field + " > " + f);
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
          // console.log("process global filter");
          let globalWhere = this.doGlobalFilter(filters, filters.global.value);
          // console.log("globalWhere", globalWhere);
          f.OR = globalWhere.OR;
          // console.log("f at field: " + field + " > " + f);
        }
      }
      j++;
    }

    // console.log("f", f);
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
    // console.log("before split : ", fields);
    let searchTerms = searchString.split(" ");
    // console.log("searching string : ", searchString, searchTerms);

    let arr: any[] = [];
    // for each term defined in the search string
    searchTerms.forEach((term) => {
      // Now loop trough all table field to check only type text
      // try {
      fields.forEach((field) => {
        // console.log("For field : ", field);
        // console.log("-- with data : ", filters[field]);

        if (filters[field].constraints) {
          if (filters[field]?.constraints[0]?.type === "text") {
            arr.push({ [field]: { contains: term } });
            // console.log("array", arr);
          } else {
            // console.log("field" + field + "not a text type, ignoring");
          }
        } else {
          // console.log("field" + field + "no constraints, ignoring");
        }
      });
      // console.log("terminate loop");
      // } catch (error) {
      //   // console.error("Error in doGlobalFilter", error);
      // }
    });

    // console.log("doGlobalFilter", arr);

    return { OR: arr };
  }
}
