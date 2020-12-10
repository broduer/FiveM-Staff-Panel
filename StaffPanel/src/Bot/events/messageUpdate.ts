import Client from '../handlers/Client'

export function triggerEvent(client: Client, oldMessage:any, newMessage:any) {
    if (oldMessage.author.bot) return;

    const embed = new client.modules.MessageEmbed()
        .setColor('512da8')
        .setThumbnail(oldMessage.guild.iconURL())
        .addField('» Member', `${oldMessage.author} \`(${oldMessage.author.id})\``)
        .addField('» Channel', `${oldMessage.channel} \`(${oldMessage.channel.id})\``)
        .addField('» Old Message', oldMessage.content)
        // .addField('» New Message', newMessage.content)
    client.channels.cache.get(client.config.logChannels.warnings).send(embed)
};