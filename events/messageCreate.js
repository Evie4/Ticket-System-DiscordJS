const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async(client, message) => {
    const prefix = client.config.client.prefix;

    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((x) => x.aliases && x.aliases.includes(commandName));



    if (!command) return;

    if (!message.channel.permissionsFor(message.member).has(command.perms.user)) return message.channel.send({
        embeds: [client.embed.noPermission(command.perms.config)]
    }).catch(() => {});

    if (!message.channel.permissionsFor(message.member).has(command.perms.user)) return message.channel.send({
        embeds: [client.embed.noPermission(command.perms.config)]
    }).catch(() => {});

    try {
        command.execute(client, message, args, prefix);

    } catch (error) {
        console.error(error);
        await message.channel.send({
            content: "An unexpected error occured!"
        });
    }


}