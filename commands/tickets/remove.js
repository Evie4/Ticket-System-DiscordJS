const { fetchTranscript } = require("discord-ghost-transcript-v13");

const discord = require("discord.js");
let dbModel = require("./../../models/Database.js")
let embeds = require('../../utils/embeds.js');


module.exports = {
    name: "remove",
    description: "Dit is een test commando.",
    usage: "!remove <user>",
    perms: {
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_CHANNELS],
        config: "MANAGE_CHANNELS"
    },
    aliases: ["verwijderen"],

    execute: async(client, message, args) => {
        if (message.channel.parent.id != dbModel.getTicketCategory(message.guild.id)) return message.channel.send({ embeds: [embeds.notInATicket()] })

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send({ embeds: [embeds.lessArguments(module.exports.usage)] });

        async function removeUserFromTicket() {
            message.channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
            message.channel.send({ embeds: [embeds.ticketUserRemove(user)] })
        }
        removeUserFromTicket();
    }
}