"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tspace_mysql_1 = require("tspace-mysql");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const timeStamp = new Date().toDateString();
    yield new tspace_mysql_1.Schema().table('users', {
        id: new tspace_mysql_1.Blueprint().int().notNull().primary().autoIncrement(),
        username: new tspace_mysql_1.Blueprint().varchar(120).unique(),
        email: new tspace_mysql_1.Blueprint().varchar(120).unique(),
        password: new tspace_mysql_1.Blueprint().varchar(120),
        created_at: new tspace_mysql_1.Blueprint().null().timestamp(),
        updated_at: new tspace_mysql_1.Blueprint().null().timestamp(),
    });
    /**
     *
     *  @Faker data
     *  await new DB().table('users').faker(5)
    */
}))();
