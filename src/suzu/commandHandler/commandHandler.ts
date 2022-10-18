//* Importing modules
import Shiro from "shirojs";
import glob from "glob";

//* making the function
async function commandHandler(suzu: Shiro.CommandClient) {
    //* running the commands setup functions.
    glob(`${__dirname}/messageCommands/`, (err, files) => {
        files.forEach((file) => {
            const command = require(file);
            if (command.setup) command.setup(suzu);
            else console.log(`${file} does not include a setup function!`);
        });
    });

    //* Interaction commands.
    const commands: Array<{
        name: string;
        main: Function;
    }> = [];

    suzu.once("ready", () => {
        //* Getting the commands and adding them to the bot
        glob(`${__dirname}/interactionCommands/**/*.js`, (err, files) => {
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

                    commands.push({
                        name: command.name,
                        main: command.main
                    })
                }
            })
        })
    })

    //* Command handling
    suzu.on("interactionCreate", async (interaction) => {
        if (interaction instanceof Shiro.CommandInteraction) {
            const commandName = interaction.data.name;

            await interaction.createMessage("Bot is loading~");

            for (let i = 0; i < commands.length; i++) {
                if (commands[i].name === commandName.trimEnd()) {
                    try {
                        return await commands[i].main(suzu, interaction);
                    } catch (err) {
                        return suzu.emit("error", err);
                    }
                }
            }

            return interaction.editOriginalMessage("Command not in current version!");
        }
    });
}

export { commandHandler as CommandHandler };