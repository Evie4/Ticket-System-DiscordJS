const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })
let embeds = require("./../utils/embeds.js")

const fs = require('fs')
const yaml = require('js-yaml')

client.dbmodel = require("./../models/Database.js")

let config = yaml.load(fs.readFileSync(`./data/config.yml`, 'utf8'))
let lang = yaml.load(fs.readFileSync(`./data/messages.yml`, 'utf8'))

async function createTicketChannel(name, section, interaction) {

    let getSupportRole = client.dbmodel.getTicketSupportRole(interaction.guild.id)
    let ticketCategory = client.dbmodel.getTicketCategory(interaction.guild.id)

    let supportRole = interaction.guild.roles.cache.find(x => x.id === getSupportRole)
    let everyoneRole = interaction.guild.roles.cache.find(x => x.name === `@everyone`);

    await interaction.guild.channels.create(`${section}-${name}`, {
        type: 'text',
        topic: interaction.user.id
    }).then(async c => {
        await c.permissionOverwrites.create(everyoneRole, { VIEW_CHANNEL: false })
        await c.permissionOverwrites.create(supportRole, { SEND_MESSAGES: true, VIEW_CHANNEL: true, EMBED_LINKS: true, ATTACH_FILES: true })
        await c.permissionOverwrites.create(interaction.user.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true, EMBED_LINKS: true, ATTACH_FILES: true })
        await c.setParent(ticketCategory)

        let row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                .setCustomId('select-category-ticket')
                .setPlaceholder(`Selecteer een Category!`)
                .addOptions([{
                        label: config.ticketOptions.one.label,
                        description: config.ticketOptions.one.description,
                        value: config.ticketOptions.one.value,
                    },

                    {
                        label: config.ticketOptions.two.label,
                        description: config.ticketOptions.two.description,
                        value: config.ticketOptions.two.value,
                    },
                    {
                        label: config.ticketOptions.three.label,
                        description: config.ticketOptions.three.description,

                        value: config.ticketOptions.three.value,
                    },

                    {
                        label: config.ticketOptions.four.label,
                        description: config.ticketOptions.four.description,
                        value: config.ticketOptions.four.value,
                    },
                    {
                        label: config.ticketOptions.five.label,
                        description: config.ticketOptions.five.description,
                        value: config.ticketOptions.five.value,
                    },

                ])
            )
        await c.send({ embeds: [embeds.selectCategory()], components: [row] })
    })
}

async function reCreateChannel(selectedCat, interaction) {
    this.selectedCat = selectedCat
    let channel = interaction.channel;
    let user = interaction.user;
    let message = interaction.message;

    await message.delete();

    await channel.setName(`${selectedCat}-${interaction.user.username}`)
    await channel.setTopic(`CREATOR: ${user.id} | CLAIMED: NO`)

    let reCreateRow = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId(`close-ticket-button`)
            .setLabel(`Sluit Ticket`)
            .setEmoji('🔐')
            .setStyle('DANGER'),

            new discord.MessageButton()
            .setCustomId(`claim-ticket-button`)
            .setLabel(`Claim Ticket`)
            .setEmoji('🦺')
            .setStyle('PRIMARY'),
        )

    await channel.send({ components: [reCreateRow], embeds: [embeds.ticketOpened(user, this.selectedCat)] })
}


module.exports = {
    createTicketChannel,
    reCreateChannel
}