import {Mechanics} from "./mechanics";
import * as _ from "lodash";
import * as fs from "fs";

export class MechanicsMapper {
    public static getTimeToMessageMap(boss: string, playerNames: string[] = []) {
        boss = boss.toLowerCase();

        let path = `bosses/${boss}.json`;
        if (!fs.existsSync(path)) {
            throw new Error(`No boss with name "${boss}" found; please make sure ${path} exists`);
        }

        const bossData = JSON.parse(fs.readFileSync(path).toString());

        const timeLimit = bossData.timeLimit;
        if (!timeLimit) {
            throw new Error('No time limit set for boss');
        }

        const maps = bossData.mechanics.map(mech => {
                let mechanic = Mechanics.fromJson(mech, timeLimit);
                return mechanic.getTimeToMessageMap(this.padPlayerNames(mechanic, playerNames));
            }
        );

        return _.mergeWith({}, ...maps, (dst, src) => {
            if (Array.isArray(dst)) {
                return dst.concat(src);
            }
        });
    }

    private static padPlayerNames(mech: Mechanics, playerNames: string[]) {
        if (mech.numberOfPlayersInvolved && playerNames.length < mech.numberOfPlayersInvolved) {
            let padAmount = mech.numberOfPlayersInvolved - playerNames.length;
            for (let i = 0; i < padAmount; ++i) {
                playerNames.push(`Player ${playerNames.length + 1}`);
            }
        } else if (playerNames.length > mech.numberOfPlayersInvolved) {
            return playerNames.slice(0, mech.numberOfPlayersInvolved);
        }
        return playerNames;
    }
}