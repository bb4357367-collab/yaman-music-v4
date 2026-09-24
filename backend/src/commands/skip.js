const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the currently playing song.'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({ content: 'There is no music playing right now!', ephemeral: true });
        }

        queue.node.skip();
        await interaction.reply('⏭️ Skipped the current song!');
    },
};
