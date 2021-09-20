const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

const { fetchTranscript } = require('discord-ghost-transcript-v13');
const embeds = require('./../utils/embeds.js');


module.exports = async(client, interaction) => {
    interaction.deferUpdate()
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case `ticket-panel-button`:
                openTicketChannel(interaction)
                break;

            case `close-ticket-button`:
                doCloseTicket(interaction, fetchTranscript)
                break;

            case `claim-ticket-button`:
                claimTicket(interaction)
                break;

            default:
                break;
        }
    }


    if (interaction.isSelectMenu()) {
        if (interaction.customId === "select-category-ticket") {
            switch (interaction.values[0]) {
                case "question_option":
                    client.utils.reCreateChannel('Vraag', interaction)
                    break;

                case "donation_option":
                    client.utils.reCreateChannel('Donatie', interaction)
                    break;

                case "unban_option":
                    client.utils.reCreateChannel('Unban', interaction)
                    break;

                case "refund_option":
                    client.utils.reCreateChannel('Refund', interaction)
                    break;

                case "klacht_option":
                    client.utils.reCreateChannel('Klacht', interaction)
                    break;

                default:
                    break;
            }
        }
    }

    function openTicketChannel(interaction) {
        if (client.database.get(`${interaction.guild.id}.${interaction.user.id}.tickets.opened`) === 1) return interaction.user.send({ embeds: [embeds.alreadyOwnsTicket()] })
        client.utils.createTicketChannel(`${interaction.user.username}`, `support`, interaction)
        client.database.set(`${interaction.guild.id}.${interaction.user.id}.tickets.opened`, 1)
    }

    function claimTicket(interaction) {
        interaction.channel.setTopic(`Claimed by: ${interaction.user.username}`)
        interaction.channel.send({
            embeds: [embeds.ticketClaim(interaction.user.username)]
        })
    }

    function doCloseTicket(interaction, fetchTranscript) {
        // Uses transcript function(from ghost-transcripts) to create a channel transcript with a max messages of (100)
        // Transcript isnt gonna save in a local file, i will update that later.
        fetchTranscript(interaction.channel, interaction, 100).then((data) => {
            const file = new discord.MessageAttachment(data, `${interaction.channel.name}.html`);

            interaction.channel.send({ embeds: [embeds.closeTicket()] });

            interaction.user.send({
                embeds: [embeds.ticketLog(`Close`, interaction.channel.name, interaction.user.username)],
                files: [file]
            }).then((i) => {
                setTimeout(async() => {
                    let getLogChannel = client.dbmodel.getTicketLogChannel(interaction.guild.id)
                    let logChannel = interaction.guild.channels.cache.find(x => x.id === getLogChannel)

                    await client.database.set(`${interaction.guild.id}.${interaction.user.id}.tickets.opened`, '0')
                    await logChannel.send({
                        embeds: [embeds.ticketLog(`Close`, interaction.channel.name, interaction.user.username)],
                        files: [file]
                    })
                    await interaction.channel.delete();
                }, 1000 * 10)
            })
        })

    }
}