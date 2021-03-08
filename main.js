const Discord = require('discord.js');
const keys = require('./keys.js');
const fs = require('fs');

const client = new Discord.Client();
const prefix = "$"


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => 
{
    console.log('Bleep Bloop Im Online!')
});

client.on('message', message =>
{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLocaleLowerCase();

    if(command === 'ping')
    {
       client.commands.get('ping').execute(message, args);
    }
});


client.login(keys.botToken());