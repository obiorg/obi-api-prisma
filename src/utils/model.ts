/**
 * Model
 *
 * https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html
 *
 */

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

    for (let filter in filters) {
      if (j > 0) {
        if (filters.hasOwnProperty(filter)) {
          const v: string = filters[filter].constraints[0].value;
        //   console.log("p0", v);

          if (v === null) {
            // console.log("p1", "va est null");
          } else {
            let value = filters[filter].constraints[0].value;
            // Converti les nombres en nombre
            if (!isNaN(parseFloat(value)) && isFinite(value)) { // could have been replace by numIs
            //   console.log("est un nombre = oui " + value);
              value = parseFloat(value);
            } else {
            //   console.log("est un nombre = non");
            }
            // console.log("S1", v);

            const a: any = {};
            let field: string = filters[filter].constraints[0].matchMode;
            a[field] = value;
            field = filter;
            // console.log(field, a);
            f[field] = a;
          }
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


  


}
