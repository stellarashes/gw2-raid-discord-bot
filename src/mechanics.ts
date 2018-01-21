export class Mechanics {
    /**
     * All times are in milliseconds
     * @param interval
     * @param numberOfPlayersInvolved
     * @param mechanicNames
     * @param warnTime
     * @param startTime
     * @param endTime
     */
    constructor(private interval: number, private numberOfPlayersInvolved: number,
                private mechanicNames: string[] = [],
                private warnTime: 5000,
                private startTime: number = 0, private endTime: number = Infinity) {
    }

    static fromJson(data: any, timeLimit: number) {
        return new Mechanics(
            data.interval, data.playersInvolved,
            data.mechanicNames, data.warnTime,
            data.startTime, data.endTime || timeLimit
        );
    }

    public getTimeToMessageMap(playerNames: string[]) {
        let timeToMessageMap = {};
        let time;

        for (let i = 0; (time = this.startTime + i * this.interval) < this.endTime; ++i) {
            timeToMessageMap[time - this.warnTime] = this.getMessage(i, playerNames);
        }

        return timeToMessageMap;
    }

    private getMessage(index: number, playerNames: string[]) {
        let mechanicName = this.mechanicNames[index % this.mechanicNames.length];
        if (this.numberOfPlayersInvolved > 0) {
            let playerName = playerNames[index % playerNames.length];
            return `${playerName} on ${mechanicName}`;
        } else {
            return mechanicName;
        }
    }
}