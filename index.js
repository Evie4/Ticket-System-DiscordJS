const { Client } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

const fs = require('fs')
const yaml = require('js-yaml')

let config = yaml.load(fs.readFileSync(`./data/config.yml`, 'utf8'))

require("./handlers/client")(client);
require("./handlers/events")(client);
require("./handlers/commands")(client);
require("./handlers/slash_commands")(client);


client.login(config.client.token)