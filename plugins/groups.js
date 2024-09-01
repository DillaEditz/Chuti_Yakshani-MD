const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "mute",
    react: "🔇",
    alias: ["close","mute_cyber"],
    desc: "Change to group settings to only admins can send messages.",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'announcement')
 await conn.sendMessage(from , { text: `🔇 *Group Chat closed by Admin ${pushname}*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "unmute",
    react: "🔇",
    alias: ["open","unmute_cyber"],
    desc: "Change to group settings to all members can send messages.",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'not_announcement')
 await conn.sendMessage(from , { text: `🔇 *Group Chat Opened by Admin ${pushname}*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "lockgs",
    react: "🔇",
    alias: ["lockgsettings"],
    desc: "Change to group settings to only admins can edit group info",
    category: "group",
    use: '.lockgs',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group Command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'locked')
 await conn.sendMessage(from , { text: `🔒 *Group settings Locked*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

//allow everyone to modify the group's settings -- like display picture etc.
//await sock.groupSettingUpdate("abcd-xyz@g.us", 'unlocked')

cmd({
    pattern: "unlockgs",
    react: "🔓",
    alias: ["unlockgsettings"],
    desc: "Change to group settings to all members can edit group info",
    category: "group",
    use: '.unlockgs',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'unlocked')
 await conn.sendMessage(from , { text: `🔓 *Group settings Unlocked*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "updategname",
    react: "🔓",
    alias: ["upgname","gname"],
    desc: "To Change the group name",
    category: "group",
    use: '.updategname',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
if (!q) return reply("🖊️ *Please write the new Group Subject*")
await conn.groupUpdateSubject(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group name Updated*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "updategdesc",
    react: "🔓",
    alias: ["upgdesc","gdesc"],
    desc: "To Change the group description",
    category: "group",
    use: '.updategdesc',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
if (!q) return reply("🖊️ *Please write the new Group Description*")
await conn.groupUpdateDescription(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group Description Updated*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["revokegrouplink","resetglink","revokelink","cyber_revoke"],
    desc: "To Reset the group link",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be admin frist*') }
await conn.groupRevokeInvite(from)
 await conn.sendMessage(from , { text: `⛔ *Group link Reseted*`}, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
})




cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["cyber_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
	     if (!isGroup) return reply(' ❗ *This is Group Command*')
         	if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❓ *Bot must be Admin Frist*")
		let teks = `💱 *HI ALL ! GIVE YOUR ATTENTION PLEASE* 
 
`
                for (let mem of participants) {
                teks += `🥎 @${mem.id.split('@')[0]}\n`
                }
                conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek })
                
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "tag",
    react: "🔊",
    alias: ["tg","cyber_tag"],
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
	     if (!isGroup) return reply(' ❗ *This is Group Command*')
         	if(!isAdmins) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❓ *Bot must be Admin Frist*")
		if(!q && !m.quoted ) return reply('ℹ️ *Please add a message or Quote a text*')
		if (!q) {
		let teks = `${m.quoted.msg}`
                return conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) } )
		}
		let teks = `${q}`
                conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) } )
                
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})


cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group informations.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('⛔ *This is Group only Command* ')
if (!isBotAdmins) return reply('⛔ *Bot must be Admin Frist* ')
if (!isAdmins) { if (!isDev) return reply('🚫 *You must be a admin frist*') }
const metadata = await conn.groupMetadata(from) 
let ppUrl = await conn.profilePictureUrl( from , 'image')
const gdata = `\n*${metadata.subject}*

🐉 *Group Jid* - ${metadata.id}

📬 *Participant Count* - ${metadata.size}

👤 *Group Creator* - ${metadata.owner}

📃 *Group Description* - ${metadata.desc}

♻️ *~Powered by Chuti_Yakshani-MD~* ♻️`
await conn.sendMessage(from,{image:{url: ppUrl },caption: gdata },{quoted:mek })
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})
