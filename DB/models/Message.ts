import { Blueprint, Model } from 'tspace-mysql'
import User from './User'
class Messages extends Model {
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
    this.hasMany({name: 'user', model: User})

    this.useTimestamp({
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }) // runing a timestamp when insert or update

    this.useSchema({
      id: new Blueprint().int().notNull().primary().autoIncrement(),
      from: new Blueprint().int(),
      to: new Blueprint().int(),
      messageText: new Blueprint().longText(),
      type: new Blueprint().tinyInt(),
      created_at: new Blueprint().timestamp(),
      updated_At: new Blueprint().timestamp(),
    })
  }
}
export default Messages
