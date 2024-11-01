"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chats = void 0;
const tspace_mysql_1 = require("tspace-mysql");
class Chats extends tspace_mysql_1.Model {
    constructor() {
        super();
        this.usePrimaryKey('id');
        this.useSchema({
            id: new tspace_mysql_1.Blueprint().int().notNull().primary().autoIncrement(),
            adder_user_id: new tspace_mysql_1.Blueprint().int(),
            added_user_id: new tspace_mysql_1.Blueprint().int(),
            created_at: new tspace_mysql_1.Blueprint().timestamp().null(),
            updated_at: new tspace_mysql_1.Blueprint().timestamp().null(),
        });
        this.useTimestamp({
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }); // runing a timestamp when insert or update
        this.useTable("chats");
    }
}
exports.Chats = Chats;
exports.default = Chats;
