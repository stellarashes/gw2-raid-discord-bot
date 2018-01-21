# gw2-raid-discord-bot
Bot to announce info via discord at set intervals

# How to use

## Create a bot user
* Go to https://discordapp.com/developers/applications/me while logged into discord and create an app
* Create a bot user for the app
* Authorize your bot to your server (click "Generate OAuth2 URL" and make sure at least send message, connect voice, and speak are enabled; navigate to the link if you are the server admin; if not, send the link to the server admin and check public bot in the page before)
* Go back to the app page, there should be an username and token, with a link called "click to reveal"; reveal the token and copy this down as you will need this later

## Running the bot
* Download or clone a copy of this repo
* Create a file named ".env", and put "DISCORD_TOKEN={token}", where {token} is the token you got from your bot above
* Make sure you have node installed (8+, available from https://nodejs.org)
* Open command prompt to the extracted folder and run the following commands:
	* `npm install`
	* `npm run compile`
	* `npm start`

# Available commands
* `!join` tell the bot to join the voice channel you are currently in; will not work if you are not already in one
* `!start [boss]` Start a timer for specified boss; currently only "dhuum" and "sab" are supported; note that starting a timer stops the previous timer
* `!stop` Stop the current timer

# Docker
If you know about docker I assume you already know how to run this as is, but if you want to run a hosted version of this, an image of this is also pre-built on docker hub under `stellarashes/gw2-raid-timer`
