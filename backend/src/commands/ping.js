const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and latency!'),
    async execute(interaction, client, guildSettings) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        
        await interaction.editReply(`Pong! 🏓\nLatency: ${latency}ms\nAPI Latency: ${Math.round(client.ws.ping)}ms`);
    },
};
