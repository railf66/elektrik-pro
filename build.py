
import re
head=open('src/head.html').read()
head=head.replace("--wL:#8a4b1f; --wN:#1e6fd0; --wPE1:#e3c400; --wPE2:#2f9e44;","--wL:#8a4b1f; --wN:#1e6fd0; --wPE1:#e3c400; --wPE2:#2f9e44; --wK:#20262c; --wG:#8d969f; --wT:#d0661c; --glow:#ffd75e;")
head=head.replace("--wL:#b06a34; --wN:#4a90e8; color-scheme:dark","--wL:#b06a34; --wN:#4a90e8; --wK:#c9d1d9; --wG:#7a848e; --wT:#e8823a; --glow:#ffd75e; color-scheme:dark")
assert head.count('--wK')==3
extra=open('src/extra.css.html').read()
body='<div class="app" id="app"></div>\n<script>\n'+open('src/lessons.js').read()+'\n'+open('src/app.js').read()+'\n</script>\n'
open('artifact.html','w').write(head+extra+body)
open('index.html','w').write('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<script src="https://telegram.org/js/telegram-web-app.js"></script>\n'+head.replace('<style>','<style>\nbody{margin:0}\n',1)+extra+'</head>\n<body>\n'+body+'</body>\n</html>\n')
print('built')
