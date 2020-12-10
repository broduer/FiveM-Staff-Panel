interface Command {
    client: any;
    config: any
    help: any;
}

class Command {
    constructor(client: any, {
        name = "",
        description = "No description provided.",
        category = "Other",
        usage = "No usage provided.",
        enabled = true,
        guildOnly = false,
        aliases = new Array(),
        permLevel = 0
    }) {
        this.client = client;
        this.config = { enabled, guildOnly, aliases, permLevel };
        this.help = { name, description, category, usage };
    };
};

export default Command