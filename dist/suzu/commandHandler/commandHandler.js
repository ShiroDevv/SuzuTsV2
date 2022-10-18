"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
//* Importing modules
const shirojs_1 = __importDefault(require("shirojs"));
const glob_1 = __importDefault(require("glob"));
//* making the function
async function commandHandler(suzu) {
    //* running the commands setup functions.
    const dirname = process.cwd().replaceAll("\\", "/");
    (0, glob_1.default)(`${dirname}/dist/suzu/commandHandler/messageCommands/**.js`, (err, files) => {
        files.forEach((file) => {
            const command = require(file);
            if (command.setup)
                command.setup(suzu);
            else
                console.log(`${file} does not include a setup function!`);
        });
    });
    //* Interaction commands.
    const commands = [];
    suzu.on("ready", () => {
        //* Getting the commands and adding them to the bot
        (0, glob_1.default)(`${dirname}/dist/suzu/commandHandler/interactionCommands/**/*.js`, (err, files) => {
            files.forEach((file) => {
                const command = require(file);
                if (command.name && command.description) {
                    suzu.createCommand({
                        name: command.name,
                        description: command.description,
                        options: command.options,
                        type: command.type,
                        defaultPermission: command.defaultPermission
                    });
                    suzu.createGuildCommand("967117817663074304", {
                        name: command.name,
                        description: command.description,
                        options: command.options,
                        type: command.type,
                        defaultPermission: command.defaultPermission
                    });
                    commands.push({
                        name: command.name,
                        main: command.main
                    });
                }
            });
        });
    });
    //* Command handling
    suzu.on("interactionCreate", async (interaction) => {
        if (interaction instanceof shirojs_1.default.CommandInteraction) {
            const commandName = interaction.data.name;
            await interaction.createMessage("Bot is loading~");
            for (let i = 0; i < commands.length; i++) {
                if (commands[i].name === commandName.trimEnd()) {
                    try {
                        return await commands[i].main(suzu, interaction);
                    }
                    catch (err) {
                        return suzu.emit("error", err);
                    }
                }
            }
            return interaction.editOriginalMessage("Command not in current version!");
        }
    });
}
exports.CommandHandler = commandHandler;
