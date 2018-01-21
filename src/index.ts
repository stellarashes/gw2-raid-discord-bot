import * as fs from "fs";
import {Bot} from "./bot";

if (fs.existsSync('.env')) {
    require('dotenv').config();
}

new Bot(process.env.DISCORD_TOKEN).login()
    .then(() => console.log('logged in'));