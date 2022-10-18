"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//* Importing modules
const shirojs_1 = require("shirojs");
//* Creating a command
const interactionBuilder = new shirojs_1.InteractionCommandBuilder();
interactionBuilder.setName("user");
interactionBuilder.setDescription("Gives info on a user");
//* This is a slightly older version, change the constant and description spots.
//* If you know the corresponding numbers to types in the discord API, you dont need the Constants import.
interactionBuilder.addOption("user", shirojs_1.Constants.ApplicationCommandOptionTypes.USER, "Gets info on a user", true);
//* Make sure to use an async function to not block the bots main file.
interactionBuilder.setFunction(async function getUserInfo(bot, interaction) {
    //* For no errors (If you dont give it the || [] it will return that it can be undefined);
    const options = interaction.data.options || [];
    //* Getting the required user
    const userGiven = options[0];
    //* Getting the user from the interactions guild
    const user = bot.guilds.get(`${interaction.guildID}`)?.members.get(userGiven?.value);
    //* If it failed to get the user.
    if (!user)
        return interaction.editOriginalMessage("Failed to retrive user!");
    //* Building an embed
    const embedBuilder = new shirojs_1.MessageEmbed();
    embedBuilder.setTitle(user?.username);
    embedBuilder.addField("Nicked?", user.nick ? user.nick : "Not nicked", false);
    embedBuilder.addField("Status", user.status ? user.status : "Unable to retreive status", false);
    embedBuilder.addField("Is bot?", `${user.bot}`, false);
    embedBuilder.addField("Join", user.joinedAt ? `${new Date(user.joinedAt)}` : "Unable to retrieve", false);
    embedBuilder.addField("ID", user.id, false);
    embedBuilder.setImage(user.avatarURL || user.avatarURL);
    const embed = embedBuilder.returnEmbed();
    //* Sending the embed
    interaction.editOriginalMessage({ content: user.username + "'s info", embeds: [embed] });
});
const interaction = interactionBuilder.returnCommand();
module.exports = interaction;
