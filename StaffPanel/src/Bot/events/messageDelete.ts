import Client from '../handlers/Client'

export function triggerEvent(client: Client, msg:any) {
    const embed = new client.modules.MessageEmbed()
        .setColor('512da8')
        .setThumbnail(msg.guild.iconURL())
        .addField('» Member', `${msg.author} \`(${msg.author.id})\``)
        .addField('» Channel', `${msg.channel} \`(${msg.channel.id})\``)
        .addField('» Message Deleted', msg.content)
    client.channels.cache.get(client.config.logChannels.warnings).send(embed)
};