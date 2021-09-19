const { fetchTranscript } = require("discord-ghost-transcript-v13");

const discord = require("discord.js");
let dbModel = require("./../../models/Database.js")
let embeds = require('../../utils/embeds.js');


module.exports = {
    name: "rename",
    description: "Dit is een test commando.",
    usage: "!rename <naam>",
    perms: {
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_CHANNELS],
        config: "MANAGE_CHANNELS"
    },
    aliases: ["hernoem"],

    execute: async(client, message, args) => {
        if (message.channel.parent.id != dbModel.getTicketCategory(message.guild.id)) return message.channel.send({ embeds: [embeds.notInATicket()] })

        function renameChannel() {
            let newName = args.slice(0).join(" ")
            if (!newName) return message.channel.send({ embeds: [embeds.lessArguments(module.exports.usage)] })
            message.channel.setName(`ticket-${newName}`)
        }

        renameChannel();
    }
}