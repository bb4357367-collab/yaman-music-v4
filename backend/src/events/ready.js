const { Events } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`[Bot] Ready! Logged in as ${client.user.tag}`);
        
        // Initialize Music System
        const player = new Player(client);
        await player.extractors.loadMulti(DefaultExtractors);
        client.player = player;

        player.events.on('playerStart', (queue, track) => {
            queue.metadata.send(`▶️ Started playing: **${track.title}**`);
        });

        player.events.on('error', (queue, error) => {
            console.log(`[Music Error] ${error.message}`);
            queue.metadata.send(`❌ Error playing stream: YouTube might be blocking the server's IP! Try adding 'soundcloud:' before your song name.`);
        });

        player.events.on('playerError', (queue, error) => {
            console.log(`[Player Error] ${error.message}`);
            queue.metadata.send(`❌ The audio player failed. YouTube might be blocking the server! Try adding 'soundcloud:' before your song name.`);
        });

        // Register slash commands (for development, register globally or to a specific guild)
        try {
            const commandsData = client.commands.map(command => command.data.toJSON());
            await client.application.commands.set(commandsData);
            console.log('[Bot] Registered / commands globally.');
        } catch (error) {
            console.error('[Bot] Failed to register slash commands:', error);
        }
    },
};
