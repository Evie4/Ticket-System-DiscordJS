const { fetchTranscript } = require("discord-ghost-transcript-v13");

const discord = require("discord.js");
let db = require('quick.db')
let dbModel = require("./../../models/Database.js")
let embeds = require('../../utils/embeds.js');


module.exports = {
    name: "close",
    description: "Dit is een test commando.",

    perms: {
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_MESSAGES],
        config: "MANAGE_CHANNELS"
    },
    aliases: ["sluiten"],

    execute: async(client, message, args) => {
        if (message.channel.parent.id != dbModel.getTicketCategory(message.guild.id)) return message.channel.send({ embeds: [embeds.notInATicket()] })

        fetchTranscript(message.channel, message, 10).then((data) => {
            const file = new discord.MessageAttachment(data, `${message.channel.name}.html`);
            message.channel.send({ embeds: [embeds.closeTicket()] })
            message.author.send({
                embeds: [embeds.ticketLog(module.exports.name, message.channel.name, message.author.username)],
                files: [file]
            }).then((i) => {
                setTimeout(async() => {
                    let getLogChannel = dbModel.getTicketLogChannel(message.guild.id)
                    let logChannel = message.guild.channels.cache.find(x => x.id === getLogChannel)
                    await message.channel.delete();
                    await db.set(`${message.guild.id}.${message.author.id}.tickets.opened`, 0)
                    await logChannel.send({ embeds: [embeds.ticketLog(module.exports.name, message.channel.name, message.author.username)], files: [file] })
                }, 1000 * 10)
            })
        })
    }
}