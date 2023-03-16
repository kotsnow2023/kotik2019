const {Permissions, Options} = require('Discord.js');
module.exports = async (bot,message,args,argsF) => {

    const user = message.mentions.users.first();   

    if(!message.channel.permissionsFor(message.author).has(Permissions.FLAGS.BAN_MEMBERS)) {
        return message.reply("У тебя не достаточно прав");
    }
    if(!user) return message.reply("Упомяни пользователя!"); //Если человек не был упомянут

    const userMember = bot.Memory.guilds[message.guild.id].members[user.id];
    if(!userMember) return message.reply("Человека нет!"); // Если человека нет в базе данных
    if(message.channel.permissionsFor(user).has(Permissions.FLAGS.ADMINISTRATOR)){
        return message.reply('У данного пользавателя есть права администратора!'); //Если у пользавателя которого хотят заварнить есть права администратора
    }

    if(userMember.warns.length >= 2) {
        const quest = {
            type: 'ACTION_ROW',
            components: [
                {
                    type: 'BUTTON', 
                    label: 'Забанить!', 
                    style: 'SECONDARY', 
                    emoji: "", 
                    url: null, 
                    disabled: false 
                },
                {
                    type: 'BUTTON', 
                    label: 'Оставить в живых', 
                    customId: 'noban', 
                    style: 'SECONDARY', 
                    emoji: "", 
                    url: null, 
                    disabled: false 
                }
            ]
        };
        const msg = await message.reply({
            embeds: [{
                title: "Забанить?"
            }],
            components: [quest]
        });
        
        const collector = await msg.createMessageComponentCollector();
    
        collector.on('collect', Interaction => {
            if(Interaction.user.id !== message.author.id) return message.reply({content: "Не ты банишь"});
            if(Interaction.customId == "ban") {
                msg.edit({
                    embeds: [{
                        title: "Забанен"
                    }],
                    components: []
                })
                const member = message.guild.members.cache.get(user.id);
                member.ban();
                userMember.warns = [];
            }

            if(Interaction.customId == "noban") {
                msg.edit({
                    embeds: [{
                        title: "Ладно, прощаем"
                    }],
                    components: []
                });
            }
            
        });
        
    } else {
        userMember.warns.push({
            id: userMember.warns.length,
            reason: argsF.slice(1).join(" ")
        });
        message.reply({content: "Варн добавлен"});
    }

    /*
    userMember.warns.splice(0,1); //От этого уберётся 1 варн
    
    */

};
module.exports.names = ["warn", "варн"];