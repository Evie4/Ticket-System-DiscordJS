const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

client.dbmodel = require("./../models/Database.js")

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

        let embed = new discord.MessageEmbed()
            .setTitle(`🦺 | DripLifeRP`)
            .setDescription(`Selecteer hier onder een Category!`)
            .setFooter(`DripLifeRP | © 2021 `)
            .setTimestamp()
            .setColor('AQUA')

        let row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                .setCustomId('select-category-ticket')
                .setPlaceholder(`Selecteer een Category!`)
                .addOptions([{
                        label: "❓ | Vraag",
                        description: "Voor al je vragen server inhoudelijk!",
                        value: "question_option",
                    },

                    {
                        label: '💰 | Donatie',
                        description: 'Voor al je server Donaties!',
                        value: 'donation_option',
                    },
                    {
                        label: '❌ | Unban aanvraag',
                        description: 'Voor als je een unban wilt aanvragen!',
                        value: 'unban_option',
                    },

                    {
                        label: '🔀 | Refund',
                        description: 'Voor als je een Refund wilt aanvragen!',
                        value: 'refund_option',
                    },
                    {
                        label: '👥 | Klacht',
                        description: 'Voor als je een klacht hebt!!',
                        value: 'klacht_option',
                    },

                ])
            )
        await c.send({ embeds: [embed], components: [row] })
    })
}

async function reCreateChannel(selectedCat, interaction) {
    let channel = interaction.channel;
    let user = interaction.user;
    let message = interaction.message;

    await message.delete();

    await channel.setName(`${selectedCat}-${interaction.user.username}`)
    await channel.setTopic(`CREATOR: ${user.id} | CLAIMED: NO`)

    let reCreatedEmbed = new discord.MessageEmbed()
        .setColor(`BLUE`)
        .setTitle('🦺 | DripLifeRP')
        .setDescription(`s`)
        .addField(`\n Ticket Maker:`,
            `${user.username}`, true)
        .addField(` \n Reason:`,
            `${selectedCat}`, true)
        .setFooter(`DripLifeRP | © 2021`)
        .setTimestamp()

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

    await channel.send({ components: [reCreateRow], embeds: [reCreatedEmbed] })
}


module.exports = {
    createTicketChannel,
    reCreateChannel
}