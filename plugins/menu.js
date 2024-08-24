const {readEnv} require('../lib/database');
const { cmd, commands } = require('../command');

// Register the 'menu' command
cmd({
    pattern: "menu",
    alias: ["allmenu", "help"],
    desc: "Get bot cmd menu",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {

        const config = await readEnv();

        let menu = {
            main: '',
            download: '',
            group:'',
            owner: '',
            convert: '',
            search: '',
            voicemsg: ''
        };

        for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
        menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
       }
    }

        let madeMenu = `👹️ *_Chuti_Yakshani-Md_* 👹️

👋 *Hello* ${pushname}

> *Main Commands* ⚙️

${menu.main}

> *Owner Commands* 🧑‍💻

${menu.owner}

> *Group Commands* 🥷

${menu.group}

> *Convert Commands* ♻️

${menu.convert}

> *Download Commands* ⏬

${menu.download}

> *Search Commands* 🌐

${menu.search}

> *Voice  Commands* 🎤

${menu.voicemsg}

♻️ *~Powered by Chuti_Yakshani-MD~* ♻️`

    await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
