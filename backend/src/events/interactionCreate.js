const { Events } = require('discord.js');
const mongoose = require('mongoose');
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
            let guildSettings = null;
            
            // Only try to fetch from MongoDB if the database is actually connected (readyState === 1)
            if (interaction.guildId && mongoose.connection.readyState === 1) {
                try {
                    guildSettings = await Guild.findOne({ guildId: interaction.guildId });
                    if (!guildSettings) {
                        guildSettings = await Guild.create({ guildId: interaction.guildId });
                    }
                } catch (dbError) {
                    console.error('[DB] Error fetching guild settings, proceeding with default settings:', dbError.message);
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
