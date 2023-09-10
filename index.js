require('./config')

const {
default: 
makeWASocket,
useMultiFileAuthState, 
DisconnectReason,
fetchLatestBaileysVersion, 
generateForwardMessageContent, 
prepareWAMessageMedia, 
generateWAMessageFromContent, 
generateMessageID, 
downloadContentFromMessage, 
MessageType,
makeInMemoryStore, 
jidDecode, 
delay,
proto
 } = require("@adiwajshing/baileys")
const { state, saveCreds } = useMultiFileAuthState(`./lib/qr-code`)
const { upload } = require('./BANCO DE DADOS/tourl');
const { exec } = require("child_process")
const sessionName = global.sessionName
const encodeUrl = require('encodeurl')
const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const spin = require('spinnies')
const PhoneNumber = require('awesome-phonenumber')
const CFonts = require('cfonts');
const moment = require('moment-timezone')
const date = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const { color, mylog, bgcolor, infolog } = require("./BANCO DE DADOS/color");
const { banner, banner2, banner3, banner5 } = require('./BANCO DE DADOS/banner.js'); // FUNÇÕES NESCESSARIAS PRA FUNFAR ALGUMAS COISAS

const os = require('os')
devs = global.devs; prefixo = prefix = global.prefixo; nomebot = global.nomebot; numerodono = global.numerodono; efeitozin = global.efeitozin; dev = global.dev; travasend = global.travasend; browser = global.browser; delaytrava = global.delaytrava;

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./BANCO DE DADOS/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./BANCO DE DADOS/myfunc')


//===================================== 
const spinner = {
"interval": 150,
"frames": [
"P", 
"PR", 
"PRE",
"PREPA", 
"PREPARE", 
"PREPARE-SE",
]}
//===================================== 
 let globalSpinner;

//===================================== 

 const getGlobalSpinner = () => {
if(!globalSpinner) globalSpinner = new spin({ color: 'pink', succeedColor: 'purple', spinner});
return globalSpinner;
 }

//===================================== 

spins = getGlobalSpinner(false)

//===================================== 

const start = (id, text) => {
spins.add("2", {text: text})
}


const infopd = (id, text) => {
spins.update(id, {text: text})
}
const success = (id, text) => {
spins.succeed(id, {text: text})
}

const close = (id, text) => {
spins.fail(id, {text: text})
}

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

// ==================================== \\ 

NomeDoBot = global.NomeDoBot
async function startconn() {
var qrcode = `./lib/qr-code`
const { state, saveCreds } = await useMultiFileAuthState(qrcode)
console.log(banner2.string)
console.log(banner3.string)
const conn = makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: [browser,'opera','V4.0'],
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(
message.buttonsMessage ||
message.listMessage
);
if (requiresPatch) {
 message = {
 viewOnceMessage: {
 message: {
 messagecontextInfo: {
 deviceListMetadataVersion: 2,
 deviceListMetadata: {},
 },
 ...message,
 },
 },
 };
 }
return message;
 },
auth: state
})

store.bind(conn.ev)



require('./config')
require('./nuke')
require('./index')
nocache('./config', Módulo => console.log(chalk.greenBright('[ 𝐖𝐇𝜟𝐓𝐒𝜟𝐏𝐏 𝐁𝚯𝐓 ] ') + hora + chalk.cyanBright(` 𝐌𝚯́𝐃𝐔𝐋𝚯 "${Módulo}" 𝜟𝐓𝐔𝜟𝐋𝐈𝐙𝜟𝐃𝚯❗`)))
nocache('./nuke', Módulo => console.log(chalk.greenBright('[ 𝐖𝐇𝜟𝐓𝐒𝜟𝐏𝐏 𝐁𝚯𝐓 ] ') + hora + chalk.cyanBright(` 𝐌𝚯́𝐃𝐔𝐋𝚯 "${Módulo}" 𝜟𝐓𝐔𝜟𝐋𝐈𝐙𝜟𝐃𝚯❗`)))
nocache('./index', Módulo => console.log(chalk.greenBright('[ 𝐖𝐇𝜟𝐓𝐒𝜟𝐏𝐏 𝐁𝚯𝐓 ] ') + hora + chalk.cyanBright(` 𝐌𝚯́𝐃𝐔𝐋𝚯 "${Módulo}" 𝜟𝐓𝐔𝜟𝐋𝐈𝐙𝜟𝐃𝚯❗`)))


conn.ev.on('messages.upsert', async ({ messages }) => {
try {
mek = messages ? messages[0]: messages[1]

/*//*//*/await conn.readMessages([mek.key])*////*//

if(!mek.message) return

if (mek.key && mek.key.remoteJid == 'status@broadcast') return

let participant = mek.key.participant;


mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message

if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return

m = smsg(conn, mek, store)

require("./nuke")(conn, m, messages, store)
} catch (err) {
console.log(err)
}
})

// Setting
conn.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
 return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

conn.ev.on('contacts.update', update => {
for (let contact of update) {
let id = conn.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

conn.getName = (jid, withoutContact= false) => {
id = conn.decodeJid(jid)
withoutContact = conn.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
 if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === conn.decodeJid(conn.user.id) ?
conn.user :
(store.contacts[id] || {})
 return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

//===================================== 

conn.setStatus = (status) => {
conn.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
 }

 conn.public = true

conn.serializeM = (m) => smsg(conn, m, store)
conn.ev.process(
async (events) => {
 if (events['presence.update']) {
await conn.sendPresenceUpdate('available')
 }
 if (events['messages.upsert']) {
const upsert = events['messages.upsert']
for (let msg of upsert.messages) {
 if (msg.key.remoteJid === 'status@broadcast') {
if (msg.message?.protocolMessage) return
await delay(3000)
 }
}
 }
 if (events['creds.update']) {
await saveCreds()
 }
}
 )
//===================================== 

conn.ev.on('connection.update', async (update) => {
 const {
connection, lastDisconnect, qr, isNewLogin
} = update
if (qr) {
console.log(color("Escanear o qrcode em um ambiente escuro faz com que o foco da câmera seja melhor.20 SEGUNDOS PARA GERAR OUTRO QR-CODE!!", "red"))
}

if (connection === 'connecting') {
start(" ", " ")
}

if (isNewLogin?.qr) {
startconn()
} 
if (connection === 'open') {
BotNumber = conn.user.id.split(':')[0];
console.log(chalk.white(`ㅤㅤ                         BOT CONECTADO ✓`));
console.log(chalk.white(`ㅤㅤ                         DATA:ㅤ${data}`));
console.log(chalk.white(`ㅤㅤ                         HORA:ㅤ${hora}`));
console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
success('2', 'ㅤㅤ                     DICA: HOSPEDE O BOT')
}

if (connection === 'close') {
var shouldReconnect = ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut)
if (String(lastDisconnect.error)
.includes("Stream Errored")) {
console.log(color("Stream errored, o bot pode está conectado em outra sessão. Se essa mensagem continuar repetindo desconecte o bot do Whatsapp.", "yellow"))
} else if (String(lastDisconnect.error)
.includes("Connection Failure")) {
exec(`rm ${sessionName}`)
console.log(color("O bot foi desconectado do WhatsApp, irei apagar e gerar um qr code novo.", "red"))
process.exit()
} else if (String(lastDisconnect.error)
.includes("Restart Required")) {
console.log(color("Reinicie se for nescessario..", "yellow"))
} else if (String(lastDisconnect.error)
.includes("Connection was lost")) {
console.log(color("net caiu ai", "yellow"))
} else if (String(lastDisconnect.error)
.includes("Connection Terminated")) {
console.log(color("net caiu ai", "cyan"))
}

if (lastDisconnect?.error) {
startconn()
}
}
}) 
//===================================== 

//===================================== 



conn.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ image: img }, { upload: conn.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
imageMessage: message.imageMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
conn.relayMessage(jid, template.message, { messageId: template.key.id })
}

 
conn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
conn.sendMessage(jid, buttonMessage, { quoted, ...options })
}


conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })


conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}


conn.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}


conn.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}


conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })


conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}


conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}


conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename

await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

conn.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}

return buffer
 } 

 
conn.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await conn.getFile(path, true)
 let { mime, ext, res, data, filename } = types
 if (res && res.status !== 200 || file.length <= 65536) {
 try { throw { json: JSON.parse(file.toString()) } }
 catch (e) { if (e.json) throw e.json }
 }
 let type = '', mimetype = mime, pathFile = filename
 if (options.asDocument) type = 'document'
 if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./BANCO DE DADOS/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'
}
 else if (/image/.test(mime)) type = 'image'
 else if (/video/.test(mime)) type = 'video'
 else if (/audio/.test(mime)) type = 'audio'
 else type = 'document'
 await conn.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
 return fs.promises.unlink(pathFile)
 }


conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}

let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await conn.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
return waMessage
}

conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {

let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === conn.user.id

return proto.WebMessageInfo.fromObject(copy)
}



conn.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data
}

}

//===================================== 

function nocache(Módulo, cb = () => { }) {
fs.watchFile(require.resolve(Módulo), async () => {
await uncache(require.resolve(Módulo))
cb(Módulo)
})
}

//===================================== 

function uncache(Módulo = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(Módulo)]
resolve()
} catch (e) {
reject(e)
}
})
}


//===================================== 

return conn
}

startconn()
