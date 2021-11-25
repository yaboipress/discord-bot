module.exports.run = async (bot, message, args) => {
    console.log("TEST3");
    message.channel.send('pong');
}

module.exports.help = {
    name:"ping"
}