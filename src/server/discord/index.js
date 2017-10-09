import client from './client';
import config from '../../../config';

client
  .login(config.discord.token)
  .then(() => console.log(`Logged in`))
  .catch(console.error);

const sendMessage = msg => {
  const channel = client.guilds
    .get('351220166018727936')
    .channels.get('364867054810955777');
  channel
    .send(`${msg}`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
};

client.on('ready', () => {
  console.log('I am ready!');
  sendMessage(`ROUTE: /api/test RESPONSE-TIME: N/A TYPE: GET COMRESSION: TRUE`);
});
