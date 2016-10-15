import _ from 'lodash';
import slack, { bot } from './slack';

const users = new Map();

bot.hello((message) => {
  console.log(`Got a message: ${message.type}`);
});

bot.message(async (data) => {
  const { channel, text, user, username } = data;

  if (username === 'bot') return;

  console.log(data);

  let name = users.get(user);

  if (!name) {
    const infoReply = await slack.userInfo({ user });
    name = _.get(infoReply, 'user.name');
  }

  await slack.postMessage({ channel, text: `@${name} ${text}` });
});
