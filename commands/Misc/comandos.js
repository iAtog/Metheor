const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("comandos");
  }
  aliases() {
    return ["commands"];
  }
  run(client, msg, args) {
    const embe = new Discord.RichEmbed()
    .setFooter('Bot desarrollado por '+client.users.get('580485225952444416').tag,'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383')
    .setColor('RANDOM')
    .setTitle("**Menú de comandos por `"+client.user.username+"`**")
    .addField("<a:zerotwosoo:632347475604406282> __Comandos de Entretenimiento__","Estos son los comandos para simular un entretenerse!\n**`pat` - Acaricia a alguien\n`kill` - Asesina a alguien\n`run` - Vete corriendo!\n`suicide` - Ve al cielito con papi Dios :c\n`triggered` - Selecciona tu avatar o el de otra persona y lo hara enojar >:)**",true)
    .addField("<a:over_crazy:622859726774075393> __Comandos de Moderación__","Estos son los comandos para sancionar a una persona!\n**`mute` - Silencia a un usuario\n`warn` - Advierte a un usuario\n`clear` - Elimina cierta cantidad de mensajes**",true)
    .addField("<a:discord:622860046648475689> __Comandos de Utilidad__","Estos son los comandos útiles para el usuario\n**`avatar` - Observa la imagen de perfil de la persona mencionada\n`level` - Mira tus niveles actuales de chat\n`qrcodegen` - Genera un código qr con el texto despues del comando\n`md` - Enviale un mensaje privado con un mensaje a una persona\n`say` - Di algo con el bot!**",true)
    .addField("<a:music_gif:639210809712574497> __Comandos de Música__","Estos son los comandos de música\n**`play` - Reproduce una canción/video en sonido por canal de voz\n`skip` - Salta la canción reproduciendos\n`stop` - Deja de escuchar la canción actual\n`nowplaying` - Que es ese ruido? Revisa cual es la canción actual!**",true)
    .addField("<a:picachu_vicio:639781242199605271> __Comandos de Imagenes__","Estos son los comandos para ver imágenes\n**`loli` - Mira una loli (Solo en canales nsfw)**",true)
    .addField("<a:rainbow_booty:638103103027281940> __Comandos de Diversion__","Estos son los comandos para divertirse\n**`meme` - Aparece un meme salvaje**",true)
    .addField("<a:search_cat:639431943716339722> __Comandos de Búsqueda__","Estos son los comandos para buscar entre paginas\n**`youtube` - Busca un video de YouTube\n`google` - Busca cosas en Google**",true)
    .addField("<a:SIIII:632347795621150730> __Comandos Random__","Estos son los comandos aleatorios sobre el bot o no xd\n**`about` - Ve los datos del bot\n`ping` - Ve la latencia del host\n`invite` - Invita el bot a tu servidor!\n`donate` - Ve el link de paypal.me para donar si quieres c:\n`prefix` (Nuevo prefix) - Cambia/Mira el prefix del bot\n`bugreport` - Envia un reporte de falla/bug a los desarrolladores**",true)
    .addField("<a:minedance:639857259572101123> __Comandos de Minecraft__","Estos son los comandos para el uso de lo relacionado a minecraft\n**`mchead` - Busca la cabeza de un usuario\n`mcavatar` - Mirale la cara a una skin\n`mcbody` - Mira el frontal de una skin**",true)
    .addField("<a:skeleton_dance:632347703870881803> __Comandos de Seguridad__","Esos son los comandos para asegurar que tu servidor este en paz y prosperidad\n**`detect` - Detecta a las personas peligrosas en su servidor **",true)
    .addField("<:money:640013365502279707> __Comandos de Economia__","Estos son los comandos de dinero y balance en el servidor\n**`balance` - Mira tu dinero actual\n`work` - Trabaja para ganar dinero\n`daily` - Recoje una recompenza diaria\n`pay` - Transfiere una cantidad de dinero a un usuario\n`crime` - Comete un crimen! :0\n`bank` - Funciones de banco galactico! Alamcena/Saca Dinero!**",true)
    .addField("<a:verifiedanim:632347818820108328> __Comandos para Desarrolladores__","Estos son los comandos para desarrolladores\n**`hastebin` - Publica un paste en https://hastebin.com\n`pastebin` - Publica un paste en https://pastebin.com**",true)
    if(msg.channel.nsfw) {embe.addField("<a:vagina:632019901095215105> __Comandos **NSFW**__","Estos son los comandos porno\n**`pussy` - Aparece un coño salvaje**",true) } else {embe.addField("🔞 __Comandos **NSFW**__","Este canal no esta marcado como `nsfw`",true)}
    msg.channel.send(embe);
  }
}

module.exports = Command;

