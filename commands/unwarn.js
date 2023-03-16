const {Permissions, Options} = require('Discord.js');
module.exports = async (bot,message,args,argsF) => {

    const user = message.mentions.users.first();   

    if(!message.channel.permissionsFor(message.author).has(Permissions.FLAGS.BAN_MEMBERS)) {
        return message.reply("У тебя не достаточно прав"); //Если у пользавателя недостаточно прав
    }
    if(!user) return message.reply("Упомяни пользователя!"); // Если никто не кого не упомянул 

    const userMember = bot.Memory.guilds[message.guild.id].members[user.id];
    if(!userMember) return message.reply("Человека нет!"); // Если человека нет в базе данных

    if(userMember.warns.length != 0) { //       
        userMember.warns.splice(0,1); //  Если варн убран 
        message.reply('Варн убран'); //  
    }else {
        message.reply("У человека нет варнов!"); // Если у человека нет варнов
    }

}
module.exports.names = ["unwarn", "убрать_варн"];