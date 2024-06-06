import { Schema, Blueprint, DB } from 'tspace-mysql'
(async () => {
    const timeStamp = new Date().toDateString();

    await new Schema().table('users', {
        id: new Blueprint().int().notNull().primary().autoIncrement(),
        username: new Blueprint().varchar(120).unique(),
        email: new Blueprint().varchar(120).unique(),
        password: new Blueprint().varchar(120),
        created_at: new Blueprint().null().timestamp(),
        updated_at: new Blueprint().null().timestamp(),
    })

    /**
     * 
     *  @Faker data
     *  await new DB().table('users').faker(5)
    */
})()
