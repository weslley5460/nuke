const fs = require('fs')
const chalk = require('chalk')

///////////////////////// PARTE DE CONFIG /////////////////////////

global.prefixo = '.' // coloque o prefixo que quiser ex: /!.-+&_$?@#=~
global.browser = 'NUKE CLiENT'
global.NomeDobot = 'nuke client' //Preencha aqui como o primeiro campo Para o nome do seu BOT
global.nomedono = global.NomeDoDono = 'ZYX 07Hz and RUSSIN 07Hz' // nome do dono aqui
global.numerodono = global.NumeroDoDonoA = '5521999104979@s.whatsapp.net' // coloque seu número aqui sem o +

///////////////////////// XXXXXXXXXXX /////////////////////////


///////////////////////// NÃO MUDA AQUI EMBAIXO, NADA /////////////////////////

global.dev = 'ZYX 07Hz and RUSSIN 07Hz' // criador
global.efeitozin = '```'// não muda nada daqui !!
global.author = 'By' //Preencha aqui como o primeiro campo Para o seu NOME ( NOME DA FIGURINHA )
global.packname = 'By' // Preencha aqui como o primeiro campo visivel a marca d'agua dos stickers. ( NOME DA FIGURINHA )
global.packname2 = 'ziquis' // Preencha aqui como o segundo campo visivel a marca d'agua dos stickers.
global.sessionName = 'qr-code' // N precisa alterar isso, este campo tem funcao de alterar o nome do qr-code.

///////////////////////// XXXXXXXXXXX ////////////////////////



let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan(`ALTERAÇÕES SALVAS ${__filename}`))
delete require.cache[file]
require(file)})