"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tspace_mysql_1 = require("tspace-mysql");
const User_1 = __importDefault(require("./User"));
class Messages extends tspace_mysql_1.Model {
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
        this.hasMany({ name: 'user', model: User_1.default });
        this.useTimestamp({
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }); // runing a timestamp when insert or update
        this.useSchema({
            id: new tspace_mysql_1.Blueprint().int().notNull().primary().autoIncrement(),
            from: new tspace_mysql_1.Blueprint().int(),
            to: new tspace_mysql_1.Blueprint().int(),
            messageText: new tspace_mysql_1.Blueprint().longText(),
            type: new tspace_mysql_1.Blueprint().tinyInt(),
            created_at: new tspace_mysql_1.Blueprint().timestamp(),
            updated_At: new tspace_mysql_1.Blueprint().timestamp(),
        });
    }
}
exports.default = Messages;
