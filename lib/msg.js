const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')

/* ===================== DOWNLOAD MEDIA ===================== */

const downloadMediaMessage = async (m, filename) => {
    if (m.type === 'viewOnceMessage') m.type = m.msg.type

    const save = async (stream, name) => {
        let buffer = Buffer.from([])
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
        fs.writeFileSync(name, buffer)
        return buffer
    }

    if (m.type === 'imageMessage') {
        const stream = await downloadContentFromMessage(m.msg, 'image')
        return save(stream, (filename || 'file') + '.jpg')
    }

    if (m.type === 'videoMessage') {
        const stream = await downloadContentFromMessage(m.msg, 'video')
        return save(stream, (filename || 'file') + '.mp4')
    }

    if (m.type === 'audioMessage') {
        const stream = await downloadContentFromMessage(m.msg, 'audio')
        return save(stream, (filename || 'file') + '.mp3')
    }

    if (m.type === 'stickerMessage') {
        const stream = await downloadContentFromMessage(m.msg, 'sticker')
        return save(stream, (filename || 'file') + '.webp')
    }

    if (m.type === 'documentMessage') {
        const ext = (m.msg.fileName || 'file.bin').split('.').pop()
        const stream = await downloadContentFromMessage(m.msg, 'document')
        return save(stream, (filename || 'file') + '.' + ext)
    }
}

/* ===================== MESSAGE SERIALIZER ===================== */

const sms = (conn, m, store) => {
    if (!m) return m
    const M = proto.WebMessageInfo

    /* -------- KEY DATA -------- */
    if (m.key) {
        m.id = m.key.id
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')

        // ✅ SAFE sender (NO NULL EVER)
        const jid = m.key.participant || m.key.remoteJid || ''
        m.sender = conn.decodeJid(m.fromMe ? conn.user.id : jid)

        m.isBot = m.id?.startsWith('BAES')
        m.isBaileys = m.id?.startsWith('BAE5')
    }

    /* -------- MESSAGE BODY -------- */
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg =
            m.mtype === 'viewOnceMessage'
                ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
                : m.message[m.mtype]

        m.body =
            m.msg?.text ||
            m.msg?.caption ||
            m.message?.conversation ||
            m.msg?.selectedDisplayText ||
            ''

        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || []

        /* -------- QUOTED -------- */
        let quoted = m.msg?.contextInfo?.quotedMessage
        if (quoted) {
            let type = getContentType(quoted)
            m.quoted = quoted[type]
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant || '')
            m.quoted.fromMe = m.quoted.sender === conn.user.id
            m.quoted.text =
                m.quoted.text ||
                m.quoted.caption ||
                m.quoted.conversation ||
                ''

            m.quoted.delete = async () =>
                conn.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.quoted.id,
                        participant: m.quoted.sender
                    }
                })

            m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
        }
    }

    /* ===================== HELPERS ===================== */

    m.reply = async (text) =>
        conn.sendMessage(m.chat, { text }, { quoted: m })

    m.replyimg = async (img, caption = '') =>
        conn.sendMessage(
            m.chat,
            {
                image: img,
                caption,
                contextInfo: {
                    mentionedJid: m.sender ? [m.sender] : []
                }
            },
            { quoted: m }
        )

    m.imgurl = async (url, caption = '') =>
        conn.sendMessage(
            m.chat,
            {
                image: { url },
                caption,
                contextInfo: {
                    mentionedJid: m.sender ? [m.sender] : []
                }
            },
            { quoted: m }
        )

    m.react = (emoji) =>
        conn.sendMessage(m.chat, {
            react: { text: emoji, key: m.key }
        })

    m.copy = () =>
        sms(conn, M.fromObject(M.toObject(m)), store)

    m.copyNForward = (jid, force = false, opt = {}) =>
        conn.copyNForward(jid, m, force, opt)

    return m
}

module.exports = { sms, downloadMediaMessage }