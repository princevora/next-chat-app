import { Blueprint, Model } from 'tspace-mysql'
class Chats extends Model {
  constructor() {
    super()

    this.usePrimaryKey('id')

    this.useSchema({
      id: new Blueprint().int().notNull().primary().autoIncrement(),
      adder_user_id: new Blueprint().int(),
      added_user_id: new Blueprint().int(),
      created_at: new Blueprint().timestamp().null(),
      updated_at: new Blueprint().timestamp().null(),
    })

    this.useTimestamp({
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }) // runing a timestamp when insert or update

    this.useTable("chats");

  }
}
export { Chats }
export default Chats
