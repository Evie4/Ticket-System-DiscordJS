const { fetchTranscript } = require("discord-ghost-transcript-v13");

const discord = require("discord.js");
let dbModel = require("./../../models/Database.js")
let embeds = require('../../utils/embeds.js');


module.exports = {
    name: "add",
    description: "Dit is een test commando.",
    usage: `!add <user>`,
    perms: {
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_CHANNELS],
        config: "MANAGE_CHANNELS"
    },
    aliases: ["toevoegen"],

    execute: async(client, message, args) => {
        if (message.channel.parent.id != dbModel.getTicketCategory(message.guild.id)) return message.channel.send({ embeds: [embeds.notInATicket()] })

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send({ embeds: [embeds.lessArguments(module.exports.usage)] });

        async function addMemberToTicket() {
            message.channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
            message.channel.send({ embeds: [embeds.ticketUserAdd(user)] })
        }
        addMemberToTicket();
    }
}