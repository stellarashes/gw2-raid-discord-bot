import {Client, Message, VoiceConnection} from "discord.js";
import {Command} from "./command";

export class Bot {
    public client: Client;
    private token: string;
    public connection: VoiceConnection;

    constructor (token: string) {
        this.client = new Client();

        this.client.on('message', this.handleMessage.bind(this));
        this.token = token;
    }

    public async login() {
        return this.client.login(this.token);
    }

    public async handleMessage(message: Message) {
        const command = this.parseCommand(message);

        if (command) {
            try {
                await command.process();
            } catch (e) {
                await message.reply(`Error occurred (${e.message})`);
                console.error(e);
            }
        }
    }

    private parseCommand(message: Message) {
        const content = message.content;
        if (content.startsWith(process.env.COMMAND_PREFIX || '!')) {
            const withoutPrefix = content.substr(1);
            const firstSpaceIndex = withoutPrefix.indexOf(' ');
            const command = withoutPrefix.substr(0, firstSpaceIndex > -1 ? firstSpaceIndex : withoutPrefix.length);

            let params = withoutPrefix.substr(command.length + 1);
            return new Command(command, params, this, message);
        } else {
            return false;
        }
    }
}