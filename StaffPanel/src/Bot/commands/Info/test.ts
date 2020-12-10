import Command from '../../handlers/Command'

class Ping extends Command {
    constructor(client: any) {
        super(client, {
            name: "test",
            permLevel: 0,
            category: "Info",
            usage: "?ping"
        });
    };

    async run(msg:any, args:String[], client:any) {

    };
};

module.exports = Ping;