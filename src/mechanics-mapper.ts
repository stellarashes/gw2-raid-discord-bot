import * as fs from "fs";
import * as path from "path";
import {Mechanics} from "./mechanics";

export class MechanicsMapper {
    public static getTimeToMessageMap(boss: string, playerNames: string[] = []) {
        let bossDataPath = path.join('..', 'bosses', `${boss}.json`);
        if (!fs.existsSync(bossDataPath)) {
            throw new Error(`No boss with ${boss} name found`);
        }

        const bossData = require(bossDataPath);

        const timeLimit = bossData;
        if (!timeLimit) {
            throw new Error('No time limit set for boss');
        }

        const maps = bossData.mechanics.map(mech =>
            Mechanics.fromJson(mech, timeLimit)
                .getTimeToMessageMap(playerNames));


    }
}