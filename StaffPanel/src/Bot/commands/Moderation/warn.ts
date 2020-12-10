import Command from '../../handlers/Command';
import discordWarnModel from '../../../models/discordWarnSchema';
import moment from 'moment';

class Warn extends Command {
    constructor(client: any) {
        super(client, {
            name: "warn",
            permLevel: 3,
            category: "Moderation",
            usage: "?warn <user> <reason>"
        });
    };

    async run(msg:any, args:String[], client:any) {
        let member = msg.mentions.members.first();
        if (!member) member = client.users.cache.get(args[1]);

        if (member) {
            msg.delete();

            let authorHighestRole = msg.member.roles.highest;
            let mentionHighestRole = member.roles.highest;

            if (mentionHighestRole.rawPosition >= authorHighestRole.rawPosition) {
                const embed = new client.modules.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(msg.author.username, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
                    .setDescription(`<:xMark:732633283069870170> You can\`t warn members with a equal or higher rank!`)
                msg.channel.send(embed);
                return;
            }

            if (!args[1]) {
                const embed = new client.modules.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(msg.author.username, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
                    .setDescription(`<:xMark:732633283069870170> You either forgot to specify a reason or member!`)
                msg.channel.send(embed);
                return
            };
    
            const newWarning = new discordWarnModel({
                discordID: msg.mentions.members.first().user.id || client.users.cache.get(args[1]).user.id,
                staffID: msg.author.id,
                time: moment().unix(),
                reason: args.slice(1).join(" ")
            });
    
            const savedWarning = await newWarning.save();
    
            const embed = new client.modules.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(msg.author.username, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
                .setDescription(`<:checkMark:732633309276012595> Successfully warned <@${msg.mentions.members.first().user.id || client.users.cache.get(args[1]).user.id}> \`(${msg.mentions.members.first().user.id || client.users.cache.get(args[1]).user.id})\``)
            msg.channel.send(embed);
    
            const msgToMember = new client.modules.MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .addField(`» Warned By: `, `<@${msg.author.id}> \`(${msg.author.id})\``)
                .addField('» Reason', args.slice(1).join(" "))
            member.send(msgToMember);
    
            const logEmbed = new client.modules.MessageEmbed()
                .setColor('YELLOW')
                .addField(`» Member Warned: `, `<@${member.id}> \`(${member.id})\``)
                .addField(`» Warned By: `, `<@${msg.author.id}> \`(${msg.author.id})\``)
                .addField('» Reason', `[${args.slice(1).join(" ")}](https://staff.bccrp.xyz/discord/warns/${savedWarning._id})`)
                .setTimestamp()
                .setFooter(`Guild: ${msg.guild.name} (${msg.guild.id})`)
            client.channels.cache.get(client.config.logChannels.warnings).send(logEmbed);
        } else {
            const embed = new client.modules.MessageEmbed()
                .setColor('RED')
                .setAuthor(msg.author.username, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
                .setDescription(`<:xMark:732633283069870170> You either forgot to specify a reason or member!`)
            msg.channel.send(embed);
        }
    }
};

module.exports = Warn;