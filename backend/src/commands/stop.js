const { SlashCommandBuilder } = require('discord.js');
const { getQueue, deleteQueue } = require('../music/queue');
const { getShoukaku } = require('../music/shoukaku');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue.'),
    
    async execute(interaction) {
        const queue = getQueue(interaction.guildId);

        if (!queue.player) {
            return interaction.reply({ content: 'There is no music playing right now!', ephemeral: true });
        }

        queue.tracks = []; // clear queue
        await getShoukaku().leaveVoiceChannel(interaction.guildId);
        deleteQueue(interaction.guildId);

        await interaction.reply('🛑 Stopped the music and cleared the queue. See you next time!');
    },
};
