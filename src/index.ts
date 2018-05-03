import * as fs from "fs";
if (fs.existsSync('.env')) {
    require('dotenv').config();
}

import {Bot} from "./bot";
import {LocalizationService} from "./localization-service";

LocalizationService.setLocale(process.env.LOCALE || 'en');


new Bot(process.env.DISCORD_TOKEN).login()
    .then(() => console.log('logged in'))
    .catch(err => {
        console.log('Login failed; was the wrong token pasted in? Please double check .env file');
        console.error(err);
    });