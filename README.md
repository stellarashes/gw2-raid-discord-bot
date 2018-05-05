# gw2-raid-discord-bot
Highly configurable bot to announce raid boss mechanics

# How to use

## Create a bot user
* Go to https://discordapp.com/developers/applications/me while logged into discord and create an app
* Create a bot user for the app
* Authorize your bot to your server (click "Generate OAuth2 URL" and make sure at least send message, connect voice, and speak are enabled; navigate to the link if you are the server admin; if not, send the link to the server admin and check public bot in the page before)
* Go back to the app page, there should be an username and token, with a link called "click to reveal"; reveal the token and copy this down as you will need this later

## Running the bot
* Easiest way is to use an existing release for windows, available here: https://github.com/stellarashes/gw2-raid-discord-bot/releases
* Edit the `.env` file in the extracted files, and put "DISCORD_TOKEN={token}", where {token} is the token you got from your bot above
* Run `gw2-raid-discord-bot.exe`
* Alternatively, you can also install node and build the bot from source; note that this has dependencies that use node-gyp, which means you will have to go through several tool installs (including Microsoft's build tool, etc, as seen guide here: https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules).  If you don't know much about programming/building, it's recommended that you use the release build above.

# Available commands
* `!join` tell the bot to join the voice channel you are currently in; will not work if you are not already in one
* `!start [boss]` or `!startnow [boss]` Start a timer for specified boss; by default "dhuum" and "sab" are supported; note that starting a timer stops the previous timer; additionally, you can pass in names for player mechanics, so `!start sab ivy soles` will cause the bot to say ivy on south, soles on west, etc.  You can optionally use `startnow` to bypass the initial countdown.
* `!stop` Stop the current timer

# Mechanics files
Files under the folder bosses outlines the times when the bot will call out specific mechanics.  Here's a brief explanation on what the fields mean:

* timeLimit: maximum time for the encounter mechanics
* for each mechanic object:
	* startTime: seconds into the fight when this mechanic first occur
	* endTime: seconds into the fight when this mechanic stops; if not set, assume end of fight (as set by timeLimit)
	* interval: seconds between when this mechanic occurs
	* playersInvolved: number of players involved; if set, bot will call out a rotating names with mechanics; i.e., 2 => Player 1 on South, Player 2 on West, Player 1 on North, etc; you can also specify an array here for statics, but be sure the number of items in the array matches the number of players involved in the mechanics
	* mechanicNames: array of strings of individual mechanic names
	* warnTime: time in seconds to start warning about upcoming mechanic; i.e., dhuum green occurs at 30 seconds into the fight, warnTime: 10 means that bot will tell first player to go to green at 20 seconds into the fight

You can also create your own file; i.e., creating `x.json` in bosses folder will allow you to use `!start x`.  This would mean you can easily implement any boss callout timer you want for discord.  Please note that the times are in seconds, and timeLimit is required.

# Known issues
* The longer the bot runs and stays in discord channel, there longer the pause between "3, 2, 1" and "go" becomes.  I'm not entirely sure what the cause is, other than the underlying library not notifying the bot when the voice has finished talking.  In my testing this hadn't affected the actual timer, but let me know if someone observes something different

# Questions / comments?
Message me at *phoenix.2518*
