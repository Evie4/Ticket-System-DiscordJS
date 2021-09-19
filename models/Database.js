const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

let db = require(`quick.db`)

// set the category

function setTicketCategory(guild_id, input) {
    return db.set(`${guild_id}.ticket.category`, input)
}

// Get the category

function getTicketCategory(guild_id) {
    return db.get(`${guild_id}.ticket.category`)
}

// set the support role

function setTicketSupportRole(guild_id, input) {
    return db.set(`${guild_id}.ticket.supportrole`, input)
}


// Get the support role
function getTicketSupportRole(guild_id) {
    return db.get(`${guild_id}.ticket.supportrole`)
}

// Sets the log channel

function setTicketLogChannel(guild_id, input) {
    return db.set(`${guild_id}.ticket.logchannel`, input)
}


// Gets the Log channel

function getTicketLogChannel(guild_id) {
    return db.get(`${guild_id}.ticket.logchannel`)
}

// Get opened tickets amount 
function getOpenedTickets(guild_id, user_id) {
    return db.get(`${guild_id}.${user_id}.tickets.opened`)
}

// Sets the amount of open tickets (This is usefull if a db query isnt executed when closed!)
function setOpenedTickets(guild_id, user_id, value) {
    return db.get(`${guild_id}.${user_id}.tickets.opened`, value)
}

// Checks if things Exists in database
function checkTable(guild_id, input) {
    let exists = false;
    let getTable = db.get(`${guild_id}.ticket.${input}`)
    if (getTable === undefined || getTable === null) {
        return console.log(exists)
    } else {
        exists = true;
        return console.log(exists)
    }
}


// Check if table exists, if not create the table!
function createNotExists(guild_id, input, value) {
    let getTable = db.has(`${guild_id}.ticket.${input}`)
    if (!getTable) {
        return db.set(`${guild_id}.ticket.${input}`, value)
    }
}


module.exports = {
    setTicketCategory,
    setTicketLogChannel,
    setTicketSupportRole,
    getTicketCategory,
    getTicketLogChannel,
    getTicketSupportRole,
    getOpenedTickets,
    setOpenedTickets,
    createNotExists,
    checkTable
}