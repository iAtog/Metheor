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

    
    aliases(){
        return [this.name];
    }

    
    permissions(){
        return [""];
    }

    proccessCommand(client, message, args){
      (async () => {
        let permissed = true;
        let prefix = "mth!";
        this.permissions().forEach(permission => {if(permission.trim() != ""){permissed = message.member.hasPermission(permission.toUpperCase());}});
        if(permissed){
            //if((this.settings().maxArgs == -1 ? false : args.length > this.settings().maxArgs) || args.length < this.settings().minArgs) return message.channel.send(':warning: Correct usage: **'+this.settings().usage+'**');
            this.run(client, message, args);
        }else{
            message.channel.send(':warning: Tu no tienes permisos.');
        }
      })();
        
    }

    run(client, message, args) {
        throw new Error("Please add the run(Client, Message, String[]) function to your command.");
    }
}

module.exports = DeletedCommand;