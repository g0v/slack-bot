import _ from 'lodash';
import slack from 'slack';

export const bot = slack.rtm.client();
export const token = process.env.SLACK_TOKEN;

const call = (name, req = {}) => (
  new Promise((resolve, reject) => {
    const fn = _.get(slack, name);
    fn(
      { ...req, token: this.token },
      (err, res) => (err ? reject(err) : resolve(res))
    );
  })
);

export default {
  userInfo: async req => await call('users.info', req),
  postMessage: async req => await call('chat.postMessage', req),
};

bot.listen({ token });
