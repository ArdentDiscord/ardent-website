import axios from 'axios';
import config from '../../config';

export default async function middleware(req, res) {
  const date = new Date();
  axios({
    method: 'post',
    url: `https://discordapp.com/api/channels/364867054810955777/messages`,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bot ${config.discord.token}` // prettier-ignore
    },
    data: {
      content: '',

      embed: {
        title: 'Ardent Website',
        type: 'rich',
        timestamp: `${date.toISOString()}`,
        color: 16738665,
        footer: {
          text: 'Served by Ardent© | By Adam#9261 and Suit ✈#6566',
          icon_url: 'https://i.imgur.com/zMgk4uz.png'
        },
        author: {
          name: 'Ardent | Website Logs',
          url: 'https://ardentbot.com:666',
          icon_url: 'https://i.imgur.com/zMgk4uz.png'
        },
        fields: [
          {
            name: 'Environment:',
            value: `Development`,
            inline: true
          },
          {
            name: 'Route:',
            value: `${req.url}`,
            inline: true
          },
          {
            name: 'Type:',
            value: `HTTP/${req.method}`,
            inline: true
          },
          {
            name: 'Response Latency',
            value: `${res.averageResponseTime}`,
            inline: true
          },
          {
            name: 'Secure',
            value: `${req.protocol === 'https' ? ':unlock:' : ':lock:'}`,
            inline: true
          },
          {
            name: 'Response Code',
            value: `${res.statusCode}`,
            inline: true
          },
          {
            name: 'Country',
            value: ':flag_my: Malaysia',
            inline: true
          },
          {
            name: 'Average Latency',
            value: `${res.getHeader('X-Response-Time')}`,
            inline: true
          }
        ]
      }
    }
  }).catch(error => console.log(error));
}
