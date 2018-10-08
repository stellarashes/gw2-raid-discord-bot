call npm run compile

REM requires modifying ffmpeg-binaries's index to export a different ffmpeg path
REM module.exports.ffmpegPath = () => path.join(process.cwd(), 'ffmpeg');

call pkg --targets node8-win-x64 package.json -o release\gw2-raid-discord-bot.exe
call copy node_modules\ffmpeg-binaries\bin\ffmpeg.exe release\
call copy node_modules\node-opus\build\Release\*.node release\
