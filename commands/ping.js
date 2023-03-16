module.exports = async (bot,message,args,argsF) => {

    if(args[0] == "ping") {
        return message.reply({
            content: "pong, pong"
        });
    }

    message.reply({
        content: "pong"
    });
    
};
module.exports.names = ["ping", "пинг"];
module.exports.interaction = {
    name: 'ping',
    description: 'Просто проверочная команда, ничего больше',
    options: [
        {
            name: "any",
            description: "другие настройки команды ping",
            type: "STRING",
	        choices: [
                {
                    name: "pingx2",
                    value: "ping"
                }
            ],
            required: false
        },
    ],
    defaultPermission: true
};