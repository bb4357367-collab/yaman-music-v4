const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View the current music queue.'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({ content: 'There is no music in the queue right now!', ephemeral: true });
        }

        const tracks = queue.tracks.toArray();

        const embed = new EmbedBuilder()
            .setTitle('🎶 Current Music Queue')
            .setColor('#5865F2')
            .setDescription(`**Now Playing:**\n${queue.currentTrack.title}\n\n**Up Next:**\n` + 
                (tracks.length > 0 
                    ? tracks.slice(0, 10).map((track, i) => `${i + 1}. ${track.title}`).join('\n') 
                    : 'The queue is empty.'));

        await interaction.reply({ embeds: [embed] });
    },
};
