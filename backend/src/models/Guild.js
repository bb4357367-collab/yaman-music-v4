const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: '!' },
    moderation: {
        logChannel: { type: String, default: null },
        autoMod: { type: Boolean, default: false },
        antiSpam: { type: Boolean, default: false },
        antiLink: { type: Boolean, default: false },
    },
    welcome: {
        enabled: { type: Boolean, default: false },
        channel: { type: String, default: null },
        message: { type: String, default: 'Welcome to the server, {user}!' },
        image: { type: Boolean, default: true },
        background: { type: String, default: null }
    },
    music: {
        247: { type: Boolean, default: false },
        volume: { type: Number, default: 100 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Guild', GuildSchema);
