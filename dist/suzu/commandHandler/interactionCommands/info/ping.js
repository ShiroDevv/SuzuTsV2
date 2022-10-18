"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//* Importing modules
const shirojs_1 = require("shirojs");
const interactionBuilder = new shirojs_1.InteractionCommandBuilder();
interactionBuilder.setName("ping");
interactionBuilder.setDescription("Replies ping!");
interactionBuilder.setFunction(async function ping(suzu, interaction) {
    return interaction.editOriginalMessage("Pong!");
});
const interaction = interactionBuilder.returnCommand();
module.exports = interaction;
