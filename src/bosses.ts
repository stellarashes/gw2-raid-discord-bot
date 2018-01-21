export const KnownBosses = {
    "dhuum": {
        "mechanics": [
            {
                "startTime": 30000,
                "interval": 30000,
                "playersInvolved": 3,
                "mechanicNames": [
                    "arrow",
                    "circle",
                    "heart",
                    "square",
                    "star",
                    "swirl",
                    "triangle"
                ],
                "warnTime": 10000
            },
            {
                "startTime": 210000,
                "interval": 80000,
                "mechanicNames": [
                    "hold bombs"
                ],
                "warnTime": 10000
            },
            {
                "startTime": 210000,
                "interval": 80000,
                "mechanicNames": [
                    "soul split"
                ]
            }
        ],
        "timeLimit": 600000
    },
    "sab": {
        "mechanics": [
            {
                "startTime": 30000,
                "interval": 30000,
                "playersInvolved": 2,
                "mechanicNames": [
                    "south",
                    "west",
                    "north",
                    "east",
                    "south",
                    "north",
                    "west",
                    "east"
                ],
            }
        ],
        "timeLimit": 540000
    }
};