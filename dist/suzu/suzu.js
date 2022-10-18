"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupSuzu = void 0;
//* Importing files
const commandHandler_js_1 = require("./commandHandler/commandHandler.js");
/**
 * * Sets up the discord bot
 * @param { Shiro.CommandClient } suzu
 */
//* Setting up the bot
async function SetupSuzu(suzu) {
    (0, commandHandler_js_1.CommandHandler)(suzu);
    suzu.connect();
}
exports.SetupSuzu = SetupSuzu;
