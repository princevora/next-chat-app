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
    yield new tspace_mysql_1.Schema().table('messages', {
        id: new tspace_mysql_1.Blueprint().int().notNull().primary().autoIncrement(),
        from: new tspace_mysql_1.Blueprint().int(),
        to: new tspace_mysql_1.Blueprint().int(),
        messageText: new tspace_mysql_1.Blueprint().longText(),
        type: new tspace_mysql_1.Blueprint().tinyInt(),
        created_at: new tspace_mysql_1.Blueprint().timestamp().null(),
        updated_At: new tspace_mysql_1.Blueprint().timestamp().null(),
    });
    /**
     *
     *  @Faker data
     *  await new DB().table('messages').faker(5)
    */
}))();
