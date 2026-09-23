const { Events } = require('discord.js');
const { initShoukaku } = require('../music/shoukaku');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`[Bot] Ready! Logged in as ${client.user.tag}`);
        
        // Initialize Music System
        initShoukaku(client);

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
