const { Client, Collection } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })



const fs = require("fs")
const yaml = require("js-yaml")

/**
 * 
 * @param {Client} client 
 */


function loadFile(file) {
    return myFile = yaml.load(fs.readFileSync(`${file}`, 'utf8'))
}


module.exports = async(client) => {


    client.commands = new Collection();
    client.slashcommands = new Collection();

    client.database = require('quick.db');
    client.config = loadFile("./data/config.yml")

    client.lang = loadFile("./data/messages.yml")
    client.embed = require(`./../utils/embeds.js`)

    client.dbmodel = require(`./../models/Database.js`)
    client.utils = require(`./../utils/channel.js`)

}