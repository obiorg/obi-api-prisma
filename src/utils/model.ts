/**
 * Model
 *
 * https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html
 *
 */

import { boolean } from "zod";

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
    for (let filter in filters) {
      // console.log("filter", filter);
      // check if filter is equal to global in order to manage differently
      if (filter !== "global") {
        // Loop over all the constraints defined in the filter
        for (let k = 0; k < filters[filter].constraints.length; k++) {// ex ===> constaints 0 { value: null, matchMode: 'equals' }
          console.log('===> constaints ' + k, filters[filter].constraints[k]);
          // Value of the constraint
          let obj: any = filters[filter].constraints[k].value; 
          
          // Check if the constraint value is defined
          if (obj !== null) { 
            // Check if the constraint is a number
            if (!isNaN(parseFloat(obj)) && isFinite(obj)) {  // could have been replace by numIs
              obj = parseFloat(obj);
            } else if ((new Date(obj)) instanceof Date && !isNaN((new Date(obj)).getTime())) {
                let dateInput = new Date(obj);
                console.log('Dectect object has a date !');
                console.log('====> dateInput as toISOString', dateInput.toISOString());
                console.log('====> dateInput as getDay', dateInput.getDay()); // jour semaine
                console.log('====> dateInput as getFullYear', dateInput.getFullYear()); // 
                console.log('====> dateInput as getMonth', dateInput.getMonth()+1);
                console.log('====> dateInput as getTime', dateInput.getTime());
                console.log('====> dateInput as getUTCDate', dateInput.getUTCDate());
              

            }else if(obj instanceof boolean) {
              
              console.log('====> Detect boolean value for  : ' + filter + ' with value ' + obj);

            }else{
              
              console.log('=====> Dectect undefined type object to filter for ' + filter + ' with value ' + obj);

            }
            // console.log("S1", v);

            const a: any = {};
            let field: string = filters[filter].constraints[k].matchMode;
            a[field] = obj;
            field = filter;
            // console.log(field, a);
            f[field] = a;
          }
        }
      } else {
        console.log("=====> gloabl filtering");
        // Global filter
        // if (filters.global.value !== null) {
        //   filtersStr =
        //     " CONCAT('.', e_id, '.', e_entreprise, '.', e_designation, '.', e_builded, '.', 'e_main', '.', 'e_activated', '.', 'e_deleted', '.', 'e_created', '.', 'e_changed')  LIKE '%" +
        //     filters.global.value +
        //     "%' ";
        // }
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
}
