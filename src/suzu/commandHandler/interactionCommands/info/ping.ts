//* Importing modules
import { InteractionCommandBuilder, CommandInteraction, CommandClient, Command } from "shirojs";

const interactionBuilder = new InteractionCommandBuilder();
interactionBuilder.setName("ping");
interactionBuilder.setDescription("Replies ping!");
interactionBuilder.setFunction(async function ping (suzu : CommandClient, interaction : CommandInteraction) {
    return interaction.editOriginalMessage("Pong!");
});

const interaction = interactionBuilder.returnCommand();

module.exports = interaction;