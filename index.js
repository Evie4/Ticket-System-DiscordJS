const { Client } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    allowedMentions: {  parse: ["everyone", "roles", "users"],
        repliedUser: true },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

require("./handlers/client")(client);
require("./handlers/events")(client);
require("./handlers/commands")(client);
require("./handlers/slash_commands")(client);

client.login(client.config.client.token)

