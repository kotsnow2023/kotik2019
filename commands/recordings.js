module.exports = async (bot,message,args,argsF) => {

    if(args[0] == "open") {
        const recordings = bot.Memory.users[message.author.id].recordings.join("\n");
        return message.reply({
            embeds: [{
                title: "Записи",
                description: recordings,
                color: "42ff9e"


            }]
        });
    }

    if(args[0] == "delete"){
        if(!args[1] || isNaN(+args[1])) return message.reply("Укажите число");
        bot.Memory.users[message.author.id].recordings.splice(+args[1], 1);
        return message.reply("Удалено");
    }

    const content = argsF.join(" ");
    bot.Memory.users[message.author.id].recordings.push(content);
    return message.reply("Запись добавлена");
    
};
module.exports.names = ["recordings"];