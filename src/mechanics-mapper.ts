import {Mechanics} from "./mechanics";
import * as _ from "lodash";
import {KnownBosses} from "./bosses";

export class MechanicsMapper {
    public static getTimeToMessageMap(boss: string, playerNames: string[] = []) {
        if (!KnownBosses[boss]) {
            throw new Error(`No boss with ${boss} name found`);
        }

        const bossData = KnownBosses[boss];

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