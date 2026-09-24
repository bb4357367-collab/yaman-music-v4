const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Time out a user for a specific duration.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to timeout')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('duration')
                .setDescription('Duration in minutes')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason for the timeout'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        const member = await interaction.guild.members.fetch(target.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
        }
        if (!member.moderatable) {
            return interaction.reply({ content: 'I do not have permission to timeout this user.', ephemeral: true });
        }

        const durationMs = duration * 60 * 1000;
        await member.timeout(durationMs, reason);
        await interaction.reply({ content: `✅ Successfully timed out **${target.tag}** for ${duration} minutes. Reason: *${reason}*` });
    },
};
