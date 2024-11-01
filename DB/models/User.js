"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const tspace_mysql_1 = require("tspace-mysql");
const Message_1 = __importDefault(require("./Message"));
class Users extends tspace_mysql_1.Model {
    constructor() {
        super();
        /**
         *
         * //Assign setting global in your model
         * @useMethod
         *
         * this.useDebug()
        */
        this.usePrimaryKey('id');
        this.belongsToMany({ name: 'chats', model: Message_1.default });
        this.useSchema({
            id: new tspace_mysql_1.Blueprint().int().notNull().primary().autoIncrement(),
            username: new tspace_mysql_1.Blueprint().varchar(120).unique(),
            email: new tspace_mysql_1.Blueprint().varchar(120).unique(),
            password: new tspace_mysql_1.Blueprint().varchar(120),
            created_at: new tspace_mysql_1.Blueprint().timestamp().null(),
            updated_at: new tspace_mysql_1.Blueprint().timestamp().null(),
        });
        this.useTimestamp({
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }); // runing a timestamp when insert or update
        this.useTable("users");
    }
    /**
     *
     * @param { number } id
     * @returns { boolean }
     */
    userExists(id) {
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
    getUser(id, email) {
        return this
            .where("email", "=", email)
            .orWhere("id", "=", id)
            .first();
    }
    /**
     *
     * @param id
     * @returns { Promise<any> }
     */
    getChats(id) {
        return new tspace_mysql_1.DB("users")
            .where("id", "=", id)
            .join("users.id", "chats.added_by")
            .orWhere("users.id", "chats.added_to")
            .toSQL();
    }
}
exports.Users = Users;
exports.default = Users;
