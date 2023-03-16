const { interaction } = require('../commands/ping');

module.exports = (bot) => {
bot
.on('ready', ()=> require('./ready')(bot))
.on('messageCreate', (message) => require('./messageCreate')(bot, message))
.on('interactionCreate', (interaction) => require('./interactionCreate')(bot, interaction));
    
};