import { Schema , Blueprint , DB } from 'tspace-mysql'
(async () => {
    await new Schema().table('messages',{ 
        id :  new Blueprint().int().notNull().primary().autoIncrement(),
        from: new Blueprint().int(),
        to: new Blueprint().int(),
        messageText: new Blueprint().longText(),
        type: new Blueprint().tinyInt(),
        created_at: new Blueprint().timestamp().null(),
        updated_At: new Blueprint().timestamp().null(),
    })

    /**
     * 
     *  @Faker data
     *  await new DB().table('messages').faker(5)
    */
})()
