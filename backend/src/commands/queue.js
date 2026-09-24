const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getQueue } = require('../music/queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View the current music queue.'),
    
    async execute(interaction) {
        const queue = getQueue(interaction.guildId);

        if (!queue.player || !queue.current) {
            return interaction.reply({ content: 'There is no music in the queue right now!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('🎶 Current Music Queue')
            .setColor('#5865F2')
            .setDescription(`**Now Playing:**\n${queue.current.info.title}\n\n**Up Next:**\n` + 
                (queue.tracks.length > 0 
                    ? queue.tracks.slice(0, 10).map((track, i) => `${i + 1}. ${track.info.title}`).join('\n') 
                    : 'The queue is empty.'));

        await interaction.reply({ embeds: [embed] });
    },
};
