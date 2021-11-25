const config = require("./config.json");
const token = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require("constants");
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded`)
    bot.commands.set(props.help.name, props)
}

//When a member join add a role called Member to them and welcome them in a channel welcome
bot.on('guildMemberAdd', member => {
    //Log the newly joined member to console
    console.log('User' + member.user.tag + ' has joined the server!');

    //Find a channel named welcome and send a Welcome message
    bot.channels.cache.find(c => c.name === "welcome").send('Welcome ' + member.user.username)

    //Find a role called Member
    let role = member.guild.roles.cache.find(r => r.name === 'Member');

    //After 10 seconds add the member role to new user
    setTimeout(function () {
        member.roles.add(role);
    }, 10000);
});

//Playing Message
bot.on("ready", async () => {
    //Log Bot's username and the amount of servers its in to console
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

    //Set the Presence of the bot user
    bot.user.setActivity("with my balls", { type: "PLAYING" });
});

//Command Manager
bot.on("messageCreate", async message => {
    //Check if author is a bot or the message was sent in dms and return
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    //get prefix from config and prepare message so it can be read as a command
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Check for prefix
    if (!cmd.startsWith(config.prefix)) return;

    respond(message);

    //Get the command from the commands collection and then if the command is found run the command file
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

});

//Token needed in token.json
bot.login(token.token);

// ...
// ...
// ...

//respond
function respond(message) {
    var m = message;
    console.log(message.content.slice(5));

    //no nolan
    if (m.author.id == 893016247703326750) {
        message.channel.send("fuck u nolan");
    }

    //simple text reponses
    text(m, "nig", "ger");
    text(m, "who is steve jobs", "ligma ballz");
    text(m, "help", "press is still woking on me rn");

    //more complicated reponses
    if (m.content.slice(5, 9) == "play") {
        music(m);
    }
}

function text(message, input, output) {
    if (message.content.slice(5) == input) { //first test
        message.channel.send(output);

    }
}

// play music
async function music(message) {
    const { joinVoiceChannel } = require('@discordjs/voice');
    var channel = message.guild.channels.cache.get(id=649435891529416716);
    console.log(message.guild.channels.cache.get(id=649435891529416716));

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

}