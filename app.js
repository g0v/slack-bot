import slack from 'slack';

const bot = slack.rtm.client();
const token = process.env.SLACK_TOKEN;

bot.hello((message) => {
  console.log(`Got a message: ${message.type}`);
});

bot.message((data) => {
  const { channel, text, username } = data;

  if (username === 'bot') return;

  console.log(data);

  slack.chat.postMessage({ token, channel, text }, (err, res) => {
    console.log(err, res);
  });
});

bot.listen({ token });
