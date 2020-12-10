import { Client, Collection, MessageEmbed } from 'discord.js';
import helper from '../../services/Logger'
import * as configFile from '../../config.json';
import { readdirSync, readFile, readFileSync } from 'fs';

interface DiscordClient {
    config: any;
    logger: Function;
    commands: any;
    user: any;
    members: any;
    guilds: any;
    modules: any;
    channels: any;
}

class DiscordClient extends Client {
    constructor(options: object) {
        super(options);
        this.config = configFile;
        this.logger = helper;
        this.commands = new Collection();
        this.modules = {};
        this.modules.MessageEmbed = MessageEmbed;

        this.on("ready", () => {
            this.logger(`${this.user.username} is ready to serve ${this.users.cache.size} users in ${this.guilds.cache.size} guilds!`);
            this.loadCommands();
            this.loadEvents();
        });

        this.on("message", async (message) => {
            if(message.author.bot) return;
            if(!message.content) return;
            if(!message.content.startsWith(this.config.prefix)) return;

            const args = message.content.slice(this.config.prefix.length).trim().split(" ");
            let command = this.commands.get(args[0].toLowerCase());

            if(command) {
                try {
                    message.channel.startTyping();
                    let permLevel: Array<number> = [0];

                    for(let role of this.config.staffRoles) {
                        if (message.member?.roles.cache.has(role.roleID)) {
                            for (let perm of role.perms) {
                                permLevel.push(perm);
                            };
                        };
                    };

                    if(permLevel.includes(command.config.permLevel)) {
                        command.run(message, args.splice(1), this);
                        this.logger(`${message.author.tag} (${message.author.id}) just ran ${args[0].toLowerCase()}.js in ${message.guild?.name} (${message.guild?.id})`);
                        message.channel.stopTyping();
                    } else {
                        const embed: MessageEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`<:xMark:732633283069870170> ${message.author}, you aren't authorized to run this command!`)
                        message.channel.send(embed);
                        message.channel.stopTyping();
                        this.logger(`${message.author.tag} (${message.author.id}) attempted to run ${args[0].toLowerCase()}.js in ${message.guild?.name} (${message.guild?.id}) but didn't have the specified permissions.`);
                    }
                } catch(error) {
                    console.log(error);
                }
            }            
        });
    
        this.login(this.config.discordToken)
    };
    
    
    loadCommands() {
        for(let dir of readdirSync('./src/Bot/commands/')) {
            for (let file of readdirSync(`./src/Bot/commands/${dir}`).filter(file => file.endsWith(".ts") || file.endsWith(".js"))) {
                const command = new (require(`../commands/${dir}/${file}`))(this);
                this.commands.set(command.help.name, command);
                this.logger(`${this.user.username} just loaded ${file}`);
            };
        };
    };

    loadEvents() {
        for (let file of readdirSync('./src/Bot/events').filter(file => file.endsWith(".ts") || file.endsWith(".js"))) {
            const eventName = file.split(".")[0];
            const event = require(`../events/${file}`);
            this.on(eventName, event.triggerEvent.bind(null, this));
            delete require.cache[require.resolve(`../events/${file}`)]
            this.logger(`${this.user.username} just loaded ${file}`);
        };
    };
};

export default DiscordClient;