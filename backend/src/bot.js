require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const express = require('express');
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();

// Connect to MongoDB (Removed deprecated options for Mongoose v7+)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('[DB] Connected to MongoDB!');
    }).catch((err) => {
        console.error('[DB] Failed to connect to MongoDB', err);
    });
} else {
    console.log('[DB] No MONGODB_URI provided. Skipping DB connection.');
}

// Load handlers
loadEvents(client);
loadCommands(client);

if (process.env.DISCORD_TOKEN && process.env.DISCORD_TOKEN !== 'your_discord_bot_token_here') {
    client.login(process.env.DISCORD_TOKEN).catch(console.error);
} else {
    console.log('[Bot] No valid DISCORD_TOKEN provided. Skipping bot login.');
}

// Dummy Web Server for Render
// If you accidentally deploy this as a "Web Service" instead of a "Background Worker",
// this will open a port so Render doesn't crash the bot.
const app = express();
const port = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => console.log(`[Bot] Dummy web server listening on port ${port}`));

module.exports = client;
