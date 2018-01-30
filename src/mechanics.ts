export class Mechanics {
    private numberOfPlayersInvolved: number;
    /**
     * All times are in milliseconds
     * @param interval
     * @param playersInvolved
     * @param mechanicNames
     * @param warnTime
     * @param startTime
     * @param endTime
     */
    constructor(public interval: number, public playersInvolved: number | string[],
                public mechanicNames: string[] = [],
                public warnTime: 5000,
                public startTime: number = 0, public endTime: number = Infinity) {
        if (Array.isArray(playersInvolved)) {
            this.numberOfPlayersInvolved = (<string[]>this.playersInvolved).length;
        } else if (typeof this.playersInvolved === 'number') {
            this.numberOfPlayersInvolved = this.playersInvolved;
        }
    }

    static fromJson(data: any, timeLimit: number) {
        return new Mechanics(
            data.interval, data.playersInvolved,
            data.mechanicNames, data.warnTime || 0,
            data.startTime || 0, data.endTime || timeLimit
        );
    }

    public getTimeToMessageMap(playerNames: string[]) {
        let timeToMessageMap = {};
        let time;

        for (let i = 0; (time = this.startTime + i * this.interval) < this.endTime; ++i) {
            timeToMessageMap[time - this.warnTime] = [this.getMessage(i, playerNames)];
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