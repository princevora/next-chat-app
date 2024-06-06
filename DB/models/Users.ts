import { Blueprint, DB, Model } from 'tspace-mysql';
import { connecton as tConnection } from '../connection';

class Users extends Model {
  constructor() {
    super()
    /**
     * 
     * //Assign setting global in your model
     * @useMethod
     *
     * this.useDebug() 
    */
    this.usePrimaryKey('id')

    this.useSchema({
      id: new Blueprint().int().notNull().primary().autoIncrement(),
      username: new Blueprint().varchar(120).unique(),
      email: new Blueprint().varchar(120).unique(),
      password: new Blueprint().varchar(120),
      created_at: new Blueprint().timestamp().null(),
      updated_at: new Blueprint().timestamp().null(),
    })

    this.useTimestamp({
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }) // runing a timestamp when insert or update

    this.useTable("users");
  }

  /**
   * 
   * @param { number } id 
   * @returns { boolean }
   */
  userExists(id: number): Promise<boolean> {
    return this
      .where("id", "=", id)
      .exists();
  }

  /**
   * 
   * @param id 
   * @param email 
   * @returns { Promise<any> }
   */
  getUser(id?: number, email?: string): Promise<any> {
    return this
      .where("email", "=", email)
      .orWhere("id", "=", id)
      .first()
  }

  /**
   * 
   * @param id 
   * @returns { Promise<any> }
   */
  getChats(id: number): any {
    return new DB("users")
      .where("id", "=", id)
      .join("users.id", "chats.added_by")
      .orWhere("users.id", "chats.added_to")
      .toSQL()
  }
}

/**
 * 
 * @returns { DB }
 */

export const getConnection = async () => {
  // Export connection
  const connection = await new DB().getConnection({ ...tConnection });

  return new DB("users").bind(connection);
}

export { Users }
export default Users
