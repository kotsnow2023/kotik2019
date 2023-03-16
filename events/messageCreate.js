module.exports = (bot, message) => {
        const {content, author, guild} = message;
        if(message.author.bot) return;
        const config = require('../config.json')
        config.prefix = ".";
        if(content.slice(0, config.prefix.length) !== config.prefix) return;

        if(!bot.Memory.users[author.id]) bot.Memory.users[author.id] = bot.createUser(message);
    if(guild) {
        if(!bot.Memory.guilds[guild.id]) bot.Memory.guilds[guild.id] = bot.createGuild(message);
        if(!bot.Memory.guilds[guild.id].members[author.id]) bot.Memory.guilds[guild.id].members[author.id] = bot.createMember(message);
    }


    const
        messageArray = content.toLowerCase().split(' '), 
        command = messageArray[0].replace(config.prefix, "");
        args = messageArray.slice(1),
        messageArrayFull = content.split(' '), 
        argsF = messageArrayFull.slice(1),
        commandRun = bot.commands.get(command);

    if(commandRun) commandRun(bot, message, args, argsF)
    //.then(any => console.log(any)) - возврощает сообщение бота
    .catch(err => console.error(err));
};