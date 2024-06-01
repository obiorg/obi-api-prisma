import { entities } from "@prisma/client";
 import { db } from "../utils/db.server";

// type Entities = {
//   id: number;
//   name: string;
//   region: string | null;
//   subregion: string | null;
// };



/**
 * Count the number of element
 */
export const count = async (): Promise<number> => {
  return db.entities.count();
};


/**
 * find all element
 * @returns a list of all element
 */
export const findAll = async (): Promise<entities[]> => {
  return db.entities.findMany({
    // select: {
    //   id: true,
    //   name: true,
    //   region: true,
    //   subregion: true,
    // },
  });
};


/**
 * find element by Id
 */
export const findById = async (id: number): Promise<entities | null> => {
  return db.entities.findUnique({
    where: {
      id,
    },
    // select: {
    //   id: true,
    //   name: true,
    //   region: true,
    //   subregion: true,
    // },
  });
};

/**
 * Create an element by specied element
 */
export const create = async (
  entities: Omit<entities, "id">
): Promise<entities> => {
  const { deleted, entity, designation, main, activated } = entities;
  return db.entities.create({
    data: {
      deleted,
      entity,
      designation,
      main,
      activated,
    },
  });
};




export const update = async(
  entities: Omit<entities, "id">,
  id:number
): Promise<entities> => {
  const {deleted, designation, builded, main, activated, logoPath, location} = entities;
  return db.entities.update({
    where: {
      id,
    },
    data: {
      deleted,
      designation,
      builded,
      main,
      activated,
      logoPath,
      location
    }
  })
}



export const delete_ = async (id: number): Promise<void> => {
  await db.entities.delete({
    where: {
      id,
    },
  })
}
