const discord = require('discord.js')
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

const fs = require('fs')
const yaml = require('js-yaml')
const { captureRejectionSymbol } = require('stream')

let lang = yaml.load(fs.readFileSync(`./data/messages.yml`, 'utf8'))
let config = yaml.load(fs.readFileSync(`./data/config.yml`, 'utf8'))

// General Embeds
var noPermission = function(required_permission) {
    return new discord.MessageEmbed()
        .setTitle(lang.general.noPermissions.embed.title)
        .setDescription(lang.general.noPermissions.embed.description.replace(`<required_permission>`, required_permission))
        .setFooter(lang.general.footer)
        .setColor(lang.general.color);
}

var lessArguments = function(usage) {
    return new discord.MessageEmbed()
        .setTitle(lang.general.lessArguments.embed.title)
        .setDescription(lang.general.lessArguments.embed.description.replace(`<usage>`, usage))
        .setFooter(lang.general.footer)
        .setColor(lang.general.color);
}



// Ticket Embeds

var notInATicket = function() {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.notInATicket.title)
        .setDescription(lang.ticket.embeds.notInATicket.description)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
}

var ticketOpened = function(user, reason) {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.ticketOpened.title)
        .setDescription(lang.ticket.embeds.ticketOpened.description)
        .addField(lang.ticket.embeds.ticketOpened.fields.one.name, lang.ticket.embeds.ticketOpened.fields.one.value.replace(`<user>`, user), lang.ticket.embeds.ticketOpened.fields.one.inline)
        .addField(lang.ticket.embeds.ticketOpened.fields.second.name, lang.ticket.embeds.ticketOpened.fields.second.value.replace(`<reason>`, reason), lang.ticket.embeds.ticketOpened.fields.one.inline)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
}

var ticketUserAdd = function(user) {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.addedToTicket.title)
        .setDescription(lang.ticket.embeds.addedToTicket.description.replace(`<user>`, user))
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
}

var ticketUserRemove = function(user) {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.removedFromTicket.title)
        .setDescription(lang.ticket.embeds.removedFromTicket.description.replace(`<user>`, user))
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
}

var ticketPanel = function() {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.ticketPanel.title)
        .setDescription(lang.ticket.embeds.ticketPanel.description)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
}

var closeTicket = function() {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.closeTicket.title)
        .setDescription(lang.ticket.embeds.closeTicket.description)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
        .setTimestamp();

}

var ticketLog = function(action, channel, moderator) {
    return new discord.MessageEmbed()
        .setTitle(`${channel.name} | Closed`.toUpperCase())
        .addField(`Action`, action, false)
        .addField(`Channel`, channel, false)
        .addField(`Moderator`, moderator, false)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
        .setTimestamp()
}

var ticketClaim = function(user) {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.ticketClaimed.title)
        .setDescription(lang.ticket.embeds.ticketClaimed.description.replace(`<user>`, user))
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
        .setTimestamp()
}

var alreadyOwnsTicket = function() {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.alreadyOwnsTicket.title)
        .setDescription(lang.ticket.embeds.alreadyOwnsTicket.description)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
        .setTimestamp()
}

var cannotFindUser = function(user) {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.notInATicket.title)
        .setDescription(lang.ticket.embeds.addedToTicket.cannotFindUser)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
}

var selectCategory = function() {
    return new discord.MessageEmbed()
        .setTitle(lang.ticket.embeds.selectCategory.title)
        .setDescription(lang.ticket.embeds.selectCategory.description)
        .setFooter(lang.general.footer)
        .setColor(lang.general.color)
        .setTimestamp()
}






// Database Embeds



module.exports = {
    noPermission,
    lessArguments,
    ticketUserAdd,
    ticketOpened,
    ticketPanel,
    ticketUserRemove,
    closeTicket,
    ticketClaim,
    alreadyOwnsTicket,
    notInATicket,
    selectCategory,
    ticketLog,
    cannotFindUser
}