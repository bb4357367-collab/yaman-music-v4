const { Events } = require('discord.js');
const Guild = require('../models/Guild');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            // Fetch or create guild settings
            let guildSettings = null;
            if (interaction.guildId) {
                guildSettings = await Guild.findOne({ guildId: interaction.guildId });
                if (!guildSettings) {
                    guildSettings = await Guild.create({ guildId: interaction.guildId });
                }
            }

            await command.execute(interaction, client, guildSettings);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
