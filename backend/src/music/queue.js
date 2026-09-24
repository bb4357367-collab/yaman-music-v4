const queues = new Map();

function getQueue(guildId) {
    if (!queues.has(guildId)) {
        queues.set(guildId, {
            player: null,
            tracks: [],
            current: null,
            textChannel: null,
        });
    }
    return queues.get(guildId);
}

function deleteQueue(guildId) {
    queues.delete(guildId);
}

module.exports = { getQueue, deleteQueue };
