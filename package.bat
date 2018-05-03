call npm run compile
call pkg --targets node9-win-x64 package.json -o release\gw2-raid-discord-bot.exe
call copy node_modules\ffmpeg-binaries\bin\ffmpeg.exe release\
call copy node_modules\node-opus\build\Release\*.node release\
call copy node_modules\ref\build\Release\*.node release\
call copy node_modules\erlpack\build\Release\*.node release\
call copy node_modules\bufferutil\build\Release\*.node release\
