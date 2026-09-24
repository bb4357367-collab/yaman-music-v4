const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue.'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);

        if (!queue) {
            return interaction.reply({ content: 'There is no music playing right now!', ephemeral: true });
        }

        queue.delete();
        await interaction.reply('🛑 Stopped the music and left the voice channel!');
    },
};
