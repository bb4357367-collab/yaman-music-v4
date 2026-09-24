const { SlashCommandBuilder } = require('discord.js');
const { getShoukaku } = require('../music/shoukaku');
const { getQueue, deleteQueue } = require('../music/queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube, Spotify, or SoundCloud.')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('The song name or URL')
                .setRequired(true)),
    
    async execute(interaction) {
        const query = interaction.options.getString('query');
        const member = interaction.member;

        if (!member.voice.channel) {
            return interaction.reply({ content: 'You need to be in a voice channel to play music!', ephemeral: true });
        }

        await interaction.deferReply();

        const shoukaku = getShoukaku();
        const node = shoukaku.getNode();
        
        if (!node) {
            return interaction.editReply('Lavalink node is not connected!');
        }

        // Search for the track
        const result = await node.rest.resolve(`ytsearch:${query}`);
        if (!result || !result.data || result.data.length === 0) {
            return interaction.editReply('No results found for your query.');
        }

        const track = result.data[0];
        const queue = getQueue(interaction.guildId);

        // Connect if not already playing
        if (!queue.player) {
            queue.player = await shoukaku.joinVoiceChannel({
                guildId: interaction.guildId,
                channelId: member.voice.channel.id,
                shardId: 0
            });

            queue.textChannel = interaction.channel;

            queue.player.on('end', () => {
                const nextTrack = queue.tracks.shift();
                if (nextTrack) {
                    queue.current = nextTrack;
                    queue.player.playTrack({ track: nextTrack.encoded });
                    queue.textChannel.send(`🎶 Now playing: **${nextTrack.info.title}**`);
                } else {
                    queue.current = null;
                    queue.textChannel.send('queue has ended! Disconnecting...');
                    shoukaku.leaveVoiceChannel(interaction.guildId);
                    deleteQueue(interaction.guildId);
                }
            });
            
            queue.player.on('error', (err) => {
                console.error('Player error:', err);
            });
        }

        queue.tracks.push(track);

        if (!queue.current) {
            const nextTrack = queue.tracks.shift();
            queue.current = nextTrack;
            await queue.player.playTrack({ track: nextTrack.encoded });
            return interaction.editReply(`🎶 Now playing: **${nextTrack.info.title}**`);
        } else {
            return interaction.editReply(`✅ Added to queue: **${track.info.title}**`);
        }
    },
};
