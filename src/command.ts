import {Message} from "discord.js";
import {Bot} from "./bot";
import {TextToSpeech} from "./text-to-speech";

export class Command {
    static tts: TextToSpeech = new TextToSpeech();

    constructor(private command: string, private args: string, private bot: Bot, private context: Message) {
    }

    public async process() {
        switch (this.command.toLowerCase()) {
            case 'join':
                let voiceChannel = this.context.member.voiceChannel;
                if (voiceChannel) {
                    this.bot.connection = await voiceChannel.join();
                } else {
                    await this.context.reply('You are not in a voice channel');
                }
                break;
            case 'say':
                await this.say(this.args);
                break;
            case 'disconnect':
                await this.bot.client.destroy();
                break;
        }
    }

    private async say(text: string) {
        if (!this.bot.connection) {
            return this.context.reply('I have not joined a channel');
        } else if (text.length > 200) {
            return this.context.reply('Message too long');
        }

        const targetFile = await TextToSpeech.getFileName(text);
        this.bot.connection.playFile(targetFile);
    }
}