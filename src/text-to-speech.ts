import * as googleTTS from "google-tts-api";
import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";
import * as download from "download";

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
}