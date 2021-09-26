<div align="center">

# Ticket System

Discord.JS Ticket System
  
![Discord](https://img.shields.io/static/v1?label=Discord.JS&message=V13&color=red)
![NodeJS](https://img.shields.io/static/v1?label=Node.JS&message=V16.10.0&color=green)
![Javascript](https://img.shields.io/static/v1?label=Code%20Language&message=Javascript&color=yellow)

</div>


### Reminder
The code isnt the cleanest, This was a bot for a FiveM server. If you want more opensource bots, just star the project and i will make more!



### Setup the bot

#### Discord Developer Portal
1. First create a application on the [[Developer Portal](https://discord.com/developers/applications)]
2. Make your application a bot [[Image](https://user-images.githubusercontent.com/78086344/134589129-89f91109-4abc-4ca2-be56-d7c0ceb7a082.png)]

#### The bot it self!
1. Change the bot token to your bot token | You can find it under [[here](https://user-images.githubusercontent.com/78086344/134589639-75cdee6e-31bf-4593-b1e1-e8330510adbe.png)] <br>
You can change the token [[here](https://github.com/hoaxFacts/Ticket-System-DiscordJS/blob/main/data/config.yml)]
3. When you changed the token, you can simply start up the bot using: "node ." in your terminal!
* If this gives a error try changing the **Intents** of your bot at [[here](https://user-images.githubusercontent.com/78086344/134589639-75cdee6e-31bf-4593-b1e1-e8330510adbe.png)]



### Features
* Ticket System (Ticketpanel, Close, Remove, Add, Rename)
* Mutli Guild Supported
* Transcript System
* Interaction (Select Menu, Buttons)
* Changeable (Messages and Config)
* Database Models | Getters/Setts/Checkers for database information




### Commands
* Ticketpanel | This creates a panel with a button! | [[Example](https://user-images.githubusercontent.com/78086344/134589897-eb6f11fd-346f-49b3-a392-97a17040837a.png)]
* Close | This closes the ticket and saves the transcript | [[Example](https://user-images.githubusercontent.com/78086344/134590071-781e1067-6b70-425e-b3ad-a0634fa7b329.png)]
* Add | Add a mentioned user to the ticket | [[Example](https://user-images.githubusercontent.com/78086344/134590123-268898df-e207-49a9-8f94-31084b80697b.png)]
* Remove| Remove the mentioned user form the channel | [[Example](https://user-images.githubusercontent.com/78086344/134590167-4769db2e-415e-4cfb-bc1b-b63683bd892c.png)]
* Rename | Rename the channel to the given name. | [[Will update soon]()]
* Claim | Claims the ticket (Only works with claim button)! | [[Example](https://user-images.githubusercontent.com/78086344/134590503-03514a9c-b0a5-42a4-9f7a-9ae1cfa07535.png)]



### Command Handler
```js
module.exports = async(client) => {
const discord = require("discord.js");

module.exports = {
    name: "test",
    description: "Dit is een test commando.",
    perms: {
        client: [discord.Permissions.ADMINISTRATOR],
        user: [discord.Permissions.FLAGS.ADMINISTRATOR]
    },
    aliases: ["test"],

    execute: async(client, message, args) => {
    
    // Code
        
    }
}
```
