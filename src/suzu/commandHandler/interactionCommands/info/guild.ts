//* Importing my modules
import { InteractionCommandBuilder, CommandInteraction, CommandClient, MessageEmbed } from "shirojs";

//* Making the command
const interactionBuilder = new InteractionCommandBuilder();
interactionBuilder.setName("guild");
interactionBuilder.setDescription("Gives info on the current guild");
interactionBuilder.setFunction(async function setGuild(suzu : CommandClient, interaction : CommandInteraction) {
    //* Get the guild
    const guild = interaction.channel.guild;

    //* Making the embed
    const embedBuilder = new MessageEmbed();
    embedBuilder.setTitle(guild.name + " Info");
    embedBuilder.setDescription(guild.description ? guild.description : "No description set");
    embedBuilder.addField("Members", `${guild.memberCount}`, false);
    embedBuilder.addField("Created at", `${new Date(guild.createdAt)}`, false);
    embedBuilder.addField("Amount of channels", `${guild.channels.size}`, false);
    embedBuilder.addField("Guild id", `${guild.id}`, false);
    embedBuilder.setThumbnail(guild.iconURL ? guild.iconURL : "https://community.librenms.org/uploads/default/original/2X/7/759793552edd033b80526884b06a706fdd1a06ba.png", undefined, undefined, undefined); //* Sorry about needing all of this
    embedBuilder.setColor(0);

    const embed = embedBuilder.returnEmbed();

    interaction.editOriginalMessage({ content : guild.name, embeds : [embed]});
});

const interaction = interactionBuilder.returnCommand();

module.exports = interaction;