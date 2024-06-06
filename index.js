const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto,
  } = require("@whiskeysockets/baileys");
  const {Boom} = require('@hapi/boom');
const fs = require('fs')
const pino = require("pino");
const path = require("path");

const store = makeInMemoryStore({
    logger: pino().child({ level: "silent", stream: "store" }),
  });

  async function connectToWhatsapp () {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

    const sky7 = makeWASocket({
        // can provide additional config here
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        browser: ["SKY7 BOT", "Safari", "3.O"],
        auth: state,
    })

    store.bind(sky7.ev);

    sky7.ev.on('messages.upsert', async (chatUpadate) => {
        try{
                let m = chatUpadate.messages[0];
                let messageGet = m.messag
                let jid = m.key.remoteJid;
                if (m.key.fromMe === true) return;
                console.log(m.key)
                const contacts = ['94754718952@s.whatsapp.net', '94775710888@s.whatsapp.net', '94776703606@s.whatsapp.net']
                let iscontac = jid.startsWith('9')
                let command = iscontac? jid.trim() : ''

                const msg = `Error!!
                -UnhandledPromiseRejectionWarning: Unhandled promise rejection (r ejection id: 1): Error: deleteWhatsappMessage is undefined. (node/sky7/main/delete_chat_messages:4796)

                -DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node. js process with a non-zero exit code.
               
               -error in - {[
               const deleteWhatsappMessage = async (message, socket) => {
                contacts = ["+94716203026", "+94771566757", "+94704197404"];
               let remoteJID = message.key[0];
               getMessage =message.conversation[0];           
               contacts.forEach(person) => {
                                  if (remoteJID === person) {
                                             await socket.ev.ON("delete-chat", remoteJID, (chat) {
                                                         deleteWhatsappChat: true
                                                         upadeteChatMsg: false
               } 
               await writeDataToDatabase(remoteJID, getMessage)
               } else {
                      return 
               }}});
               
               Restarting main database......!

               ./root/main/black-heart/src/index.js (nnpm run start)
               `
                const restartmsg = "```Restarting main database......!```"
                const set = "```Restart API service.....!"
                const success = "```Successfuly restart node ./root/main/index.js```"


            switch (command) {
                case '94716203026@s.whatsapp.net':
                    console.log('Ditected')
                    sky7.sendMessage(jid, {text:msg})
                break;

                case '94771566757@s.whatsapp.net':
                    console.log('Ditected')
                    sky7.sendMessage(jid, {text:msg})
                break;

                case '94704197404@s.whatsapp.net':
                    console.log('Ditected')
                    sky7.sendMessage(jid, {text:msg})
                break;

                case '94754718952@s.whatsapp.net':
                    console.log('Ditected')
                    sky7.sendMessage(jid, {text:msg})
                break;

                
            }
  

        }catch {

        }   
         
    })

    sky7.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
          let reason = lastDisconnect.error
            ? lastDisconnect?.error?.output.statusCode
            : 0;
          if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete Session and Scan Again`);
            process.exit();
          } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            connectToWhatsapp();
          } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            connectToWhatsapp();
          } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(
              "Connection Replaced, Another New Session Opened, Please Close Current Session First"
            );
            process.exit();
          } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
            process.exit();
          } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            connectToWhatsapp();
          } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            connectToWhatsapp();
          } else {
            console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
          }
        }
        console.log('Connected...', update)
      });
    
     sky7.ev.on("creds.update", saveCreds);





  }

connectToWhatsapp();



