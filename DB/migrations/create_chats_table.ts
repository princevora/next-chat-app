import { Schema , Blueprint , DB } from 'tspace-mysql'
(async () => {
    await new Schema().table('chats',{ 
        id: new Blueprint().int().notNull().primary().autoIncrement(),
        adder_user_id: new Blueprint().int(),
        added_user_id: new Blueprint().int(),
        created_at: new Blueprint().timestamp().null(),
        updated_at: new Blueprint().timestamp().null(),
    })

    /**
     * 
     *  @Faker data
     *  await new DB().table('chats').faker(5)
    */
})()
