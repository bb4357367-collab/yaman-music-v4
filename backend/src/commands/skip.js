const { SlashCommandBuilder } = require('discord.js');
const { getQueue } = require('../music/queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the currently playing song.'),
    
    async execute(interaction) {
        const queue = getQueue(interaction.guildId);

        if (!queue.player || !queue.current) {
            return interaction.reply({ content: 'There is no music playing right now!', ephemeral: true });
        }

        // Stop the current track, which will trigger the 'end' event and play the next one
        await queue.player.stopTrack();
        await interaction.reply('⏭️ Skipped the current song!');
    },
};
