import Discord, { Client } from 'discord.js'; // eslint-disable-line no-unused-vars

const disabledEvents = [
  'GUILD_CREATE',
  'GUILD_DELETE',
  'GUILD_UPDATE',
  'GUILD_MEMBER_ADD',
  'GUILD_MEMBER_REMOVE',
  'GUILD_MEMBER_UPDATE',
  'GUILD_ROLE_CREATE',
  'GUILD_ROLE_DELETE',
  'GUILD_ROLE_UPDATE',
  'GUILD_BAN_ADD',
  'GUILD_BAN_REMOVE',
  'GUILD_EMOJIS_UPDATE',
  'CHANNEL_CREATE',
  'CHANNEL_DELETE',
  'CHANNEL_UPDATE',
  'CHANNEL_PINS_UPDATE',
  'MESSAGE_CREATE',
  'MESSAGE_DELETE',
  'MESSAGE_UPDATE',
  'MESSAGE_DELETE_BULK',
  'MESSAGE_REACTION_ADD',
  'MESSAGE_REACTION_REMOVE',
  'MESSAGE_REACTION_REMOVE_ALL',
  'USER_UPDATE',
  'USER_NOTE_UPDATE',
  'USER_SETTINGS_UPDATE',
  'USER_GUILD_SETTINGS_UPDATE',
  'PRESENCE_UPDATE',
  'VOICE_STATE_UPDATE',
  'TYPING_START',
  'VOICE_SERVER_UPDATE',
  'RELATIONSHIP_ADD',
  'RELATIONSHIP_REMOVE'
];

const client = new Client({
  autoReconnect: true,
  messageCacheMaxSize: 1,
  disableEveryone: true,
  disabledEvents: [...disabledEvents]
});

client.login();

process.on('SIGHUP', () => process.exit(0));

process.on('unhandledRejection', reason => client.error(reason));
