import Discord, { ShardingManager } from 'discord.js'; // eslint-disable-line no-unused-vars
import { resolve } from 'path';
import config from '../../config';

const pathToClient = resolve('./src/discord/client.js');

const manager = new ShardingManager(pathToClient, {
  token: config.discord.token,
  shardArgs: ['--color']
});

manager.stats = {
  shards: manager.shards.size
};

const main = async () => manager.spawn(2);

main();

export default main;
