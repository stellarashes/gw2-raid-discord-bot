import * as fs from "fs";

const fallback = 'en';

export class LocalizationService {
    private static locale = 'en';
    private static fallbackDictionary = LocalizationService.readDictionary(fallback);
    private static dictionary = LocalizationService.fallbackDictionary;

    public static getLocale() { return this.locale; }

    public static setLocale(locale: string) {
        try {
            this.locale = locale;
            this.dictionary = LocalizationService.readDictionary(`./${locale}`);
        } catch (e) {
            console.error(`Failed to load dictionary for locale ${locale}; error was ${e}`);
        }
    }

    private static readDictionary(locale: string) {
        return JSON.parse(fs.readFileSync(`localizations/${locale}.json`).toString());
    }

    public static get(key: string) {
        if (this.dictionary.hasOwnProperty(key)) {
            return this.dictionary[key];
        } else {
            return this.fallbackDictionary[key];
        }
    }
}