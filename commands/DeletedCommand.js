class DeletedCommand {

    constructor(name){
        this.name = name;
    }

    settings(){
        return {
            minArgs: 0,
            maxArgs: -1,
            usage: "!"+this.name
        }
    }

    // Aliases (use for Command Handler)
    aliases(){
        return [this.name];
    }

    // No permissions
    permissions(){
        return [""];
    }

    proccessCommand(client, message){
        let permissed = true;
        let args = message.content.split(' ').slice(1);
        this.permissions().forEach(permission => {if(permission.trim() != ""){permissed = message.member.hasPermission(permission.toUpperCase());}});
        if(permissed){
            if((this.settings().maxArgs == -1 ? false : args.length > this.settings().maxArgs) || args.length < this.settings().minArgs) return message.channel.send(':warning: Correct usage: **'+this.settings().usage+'**');
            this.run(client, message, args);
        }else{
            message.channel.send(':warning: Tu no tienes permisos.');
        }
    }

    // Run
    run(client, message, args) {
        throw new Error("Please add the run(Client, Message, String[]) function to your command.");
    }
}

module.exports = DeletedComand;