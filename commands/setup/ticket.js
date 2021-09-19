const discord = require("discord.js");
let dbModel = require("./../../models/Database.js")


module.exports = {
    name: "ticket",
    description: "Dit is een test commando.",
    perms: {
        client: [discord.Permissions.ADMINISTRATOR],
        user: [discord.Permissions.FLAGS.ADMINISTRATOR]
    },
    aliases: ["ticket"],

    execute: async(client, message, args) => {
        let option = args[0]

        switch (option) {
            case `role`:
                let mentionedRole = message.mentions.roles.first().id;
                if (!mentionedRole) return message.channel.send("Je hebt geen role meegegeven!")
                dbModel.setTicketSupportRole(message.guild.id, mentionedRole)
                message.channel.send(`Role succesvol gezet!`)
                break;
            case `logchannel`:
                let mentionedChannel = message.mentions.channels.first().id;
                if (!mentionedChannel) return message.channel.send("Je hebt geen channel meegegeven");
                dbModel.setTicketLogChannel(message.guild.id, mentionedChannel)
                message.channel.send(`Logchannel succesvol gezet`)
                break;
            case `category`:
                let ticketCat = args[1]
                if (!ticketCat) return message.channel.send("Je hebt geen categoryID meegegeven")
                dbModel.setTicketCategory(message.guild.id, ticketCat)
                message.channel.send(`Category succesvol gezet!`)

            default:
                break;
        }
    }
}