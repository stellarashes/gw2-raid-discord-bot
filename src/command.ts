import {Message} from "discord.js";
import {Bot} from "./bot";
import {TextToSpeech} from "./text-to-speech";
import * as minimist from "minimist-string";
import {MechanicsMapper} from "./mechanics-mapper";
import Bluebird = require("bluebird");
import {debug} from "./debug";

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
            case 'disconnect':
                Command.tts.clearTimeout();
                await this.bot.client.destroy();
                break;
            case 'start':
                await this.startBoss(this.args);
                break;
            case 'stop':
                Command.tts.clearTimeout();
                break;
            case 'leave':
                if (this.bot.connection) {
                    this.bot.connection.disconnect();
                    this.bot.connection = null;
                    global.gc();
                }
                break;
            case 'rejoin':
                let channel = this.bot.connection.channel;
                await this.bot.connection.disconnect();
                this.bot.connection = await channel.join();
                break;
        }
    }

    private async startBoss(params: string) {
        const parsed = minimist(params);
        let names: string[] = parsed['_'];
        let boss = names.shift();

        let times = MechanicsMapper.getTimeToMessageMap(boss, names);
        await Command.tts.sayTimeMap(times, this.say.bind(this));
    }

    private async say(text: string) {
        if (!this.bot.connection) {
            return this.context.reply('I have not joined a channel');
        } else if (text.length > 200) {
            return this.context.reply('Message too long');
        }

        const targetFile = await TextToSpeech.getFileName(text);
        let dispatcher = this.bot.connection.playFile(targetFile);
        debug(`Playing file for text: ${text}; file location: ${targetFile}`);
        return new Bluebird((resolve, reject) => {
            dispatcher.on('end', resolve);
            dispatcher.on('error', reject);
        }).finally(() => {
            dispatcher.removeAllListeners();
            debug(`Completed file play for ${text}`);
        });
    }
}