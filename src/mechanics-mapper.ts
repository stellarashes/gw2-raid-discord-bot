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
                return mechanic.getTimeToMessageMap(this.getPlayerNames(mechanic, playerNames));
            }
        );

        return _.mergeWith({}, ...maps, (dst, src) => {
            if (Array.isArray(dst)) {
                return dst.concat(src);
            }
        });
    }

    private static getPlayerNames(mech: Mechanics, playerNames: string[]) {
        if (typeof(mech.playersInvolved) === 'number') {
            return this.padPlayerNames(mech.playersInvolved, playerNames, i => `Player ${i + 1}`);
        } else if (Array.isArray(mech.playersInvolved)) {
            return this.padPlayerNames(mech.playersInvolved.length, playerNames, i => mech.playersInvolved[i]);
        } else {
            return playerNames;
        }
    }

    private static padPlayerNames(numberOfPlayers: number, specifiedPlayerNames: string[], padPlayerNameDelegate: (index: number) => string) {
        if (specifiedPlayerNames.length < numberOfPlayers) {
            let baseAmount = specifiedPlayerNames.length;
            let padAmount = numberOfPlayers - baseAmount;
            for (let i = 0; i < padAmount; ++i) {
                specifiedPlayerNames.push(padPlayerNameDelegate(i + baseAmount));
            }
            return specifiedPlayerNames;
        } else if (specifiedPlayerNames.length > numberOfPlayers) {
            return specifiedPlayerNames.slice(0, numberOfPlayers);
        } else {
            return specifiedPlayerNames;
        }
    }


}