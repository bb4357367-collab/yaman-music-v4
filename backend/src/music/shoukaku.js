const { Shoukaku, Connectors } = require('shoukaku');

let shoukaku;

const Nodes = [{
    name: 'Main',
    url: `${process.env.LAVALINK_HOST || 'localhost'}:${process.env.LAVALINK_PORT || 2333}`,
    auth: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
    secure: process.env.LAVALINK_SECURE === 'true'
}];

function initShoukaku(client) {
    shoukaku = new Shoukaku(new Connectors.DiscordJS(client), Nodes);

    shoukaku.on('error', (_, error) => console.error('[Lavalink] Error:', error));
    shoukaku.on('ready', (name) => console.log(`[Lavalink] Node ${name} is ready!`));
    shoukaku.on('close', (name, code, reason) => console.log(`[Lavalink] Node ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`));
    shoukaku.on('disconnect', (name, count) => console.log(`[Lavalink] Node ${name} disconnected. Reconnecting... (Attempt ${count})`));

    return shoukaku;
}

function getShoukaku() {
    return shoukaku;
}

module.exports = { initShoukaku, getShoukaku };
