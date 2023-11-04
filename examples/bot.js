// eslint-disable-next-line node/no-extraneous-import
import {createBot} from 'adamant-botfactory';
import * as dotenv from 'dotenv';

dotenv.config();

const nodes = [
  'https://endless.adamant.im',
  'https://clown.adamant.im',
  'http://23.226.231.225:36666',
  'http://88.198.156.44:36666',
  'https://lake.adamant.im',
];

const bot = createBot(process.env.PASS_PHRASE.trim(), {
  nodes,
});

bot.command('start', usr => {
  usr.reply('Hello, world!');
});

bot.start();
