const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {
        if ( message.author.id !=="345694094992998401" && !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sem permissão !!");
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tomute) return message.reply("Mencione um usuario \n Ex: B!mute @user#0000 1h motivo");
        let reason = args.slice(1)
                .join(" ");
        if (!reason) return message.reply("Indique um motivo \n Ex: m!mute @user#0000 1h motivo");
        let muterole = message.guild.roles.find(`name`, "Muted");
        if (!muterole) {
                try {
                        muterole = await message.guild.createRole({
                                name: "Muted"
                                , color: "#000000"
                                , permissions: []
                        })
                        message.guild.channels.forEach(async (channel, id) => {
                                await channel.overwritePermissions(muterole, {
                                        SEND_MESSAGES: false
                                        , ADD_REACTIONS: false
                                });
                        });
                } catch (e) {
                        console.log(e.stack);
                }
        }
  let mutetime;
      message.reply("Quanto tempo você deseja mutar").then(msg => {
            const filter = m => m.author.id === message.author.id;
            const collector = msg.channel.createMessageCollector(filter, { time: 90000 });
            collector.once("collect", m => {
              mutetime = m.content
        message.delete()
                .catch(O_o => {});
  
           tomute.send(`Você foi mutado por ${mutetime}. Sorry !`)
        
            

        message.channel.send(`<@${tomute.id}> está mutado por ${mutetime}`)
        tomute.addRole(muterole.id);
        setTimeout(function () {
                tomute.removeRole(muterole.id);
                message.channel.send(`<@${tomute.id}> Foi desmutado !`);
        }, ms(mutetime));
            });
        })
        

}
 module.exports.help = {
  name: "mute"
}
