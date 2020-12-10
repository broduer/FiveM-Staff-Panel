import Command from '../../handlers/Command'

class Ping extends Command {
    constructor(client: any) {
        super(client, {
            name: "ping",
            permLevel: 0,
            category: "Info",
            usage: "?ping"
        });
    };

    async run(msg:any, args:String[], client:any) {
        const embed = new client.modules.MessageEmbed()
            .setColor('CC8EF4')
            .setDescription(`<:botMark:771187491835346954> Bot Ping: **Checking!** ms | Status: **Connected**`)
        const sentEmbed = await msg.channel.send(embed);

        embed.setDescription(`<:botMark:771187491835346954> Bot Ping: **${Math.round(client.ws.ping)}** ms | Status: **Connected**`);
        sentEmbed.edit(embed);
    };
};

module.exports = Ping;