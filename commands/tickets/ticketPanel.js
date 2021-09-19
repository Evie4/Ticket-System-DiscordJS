const discord = require("discord.js");
let dbModel = require("./../../models/Database.js")
let embeds = require('../../utils/embeds.js');


module.exports = {
    name: "ticketpanel",
    description: "Dit is een test commando.",
    perms: {
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_CHANNELS],
        config: "MANAGE_CHANNELS"
    },
    aliases: ["ticketpaneel"],

    execute: async(client, message, args) => {
        dbModel.createNotExists(message.guild.id, `category`, null)
        dbModel.createNotExists(message.guild.id, `role`, null)
        dbModel.createNotExists(message.guild.id, `logchannel`, null)

        let ticketRow = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                .setCustomId(`ticket-panel-button`)
                .setLabel(`Open ticket`)
                .setStyle('PRIMARY')
                .setEmoji('🎟')
            );

        message.channel.send({ embeds: [embeds.ticketPanel()], components: [ticketRow] })

    }

}