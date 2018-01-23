import * as googleTTS from "google-tts-api";
import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";
import * as download from "download";
import * as _ from "lodash";

const folder = 'voice_cache';

export class TextToSpeech {
    /**
     * Get a local sound file that corresponds to input string;
     * Local file may be cached, if not, pull from other sources
     * @param {string} text
     * @returns {Promise<void>}
     */
    public static async getFileName(text: string) {
        const hash = TextToSpeech.hashText(text);
        const filePath = path.join(process.cwd(), folder, hash);

        if (!fs.existsSync(filePath)) {
            const url = await googleTTS(text, 'en', 1);
            await download(url, folder, {
                filename: hash,
            });
        }

        return filePath;
    }

    private static hashText(text: string) {
        return crypto.createHmac('sha256', '0xdeadbeef')
            .update(text)
            .digest('hex');
    }

    private static timeoutHandles;

    /**
     * Say all info in a timemap; note this function returns after the time map entries are started to be spoken, not when they have all finished
     * @param timeMap
     * @param {(text) => Promise<any>} sayDelegate
     * @returns {Promise<void>}
     */
    public async sayTimeMap(timeMap: {[time: string]: string[]}, sayDelegate: (text) => Promise<any>) {
        this.clearTimeout();
        let values = _.flatten(Object.values(timeMap));

        await Promise.all(values.map(text => TextToSpeech.getFileName(text)));
        await sayDelegate('Starting in 3.  2.  1.  ');
        await sayDelegate('Go');

        TextToSpeech.timeoutHandles = Object.entries(timeMap)
            .map(([key, value]) => {
                return setTimeout(async () => {
                    for (const text of value) {
                        await sayDelegate(text);
                    }
                }, Number(key) * 1000);
            });
    }

    public clearTimeout() {
        if (TextToSpeech.timeoutHandles) {
            TextToSpeech.timeoutHandles.forEach(id => clearTimeout(id));
            TextToSpeech.timeoutHandles = null;
        }
    }
}