import {createBot} from 'adamant-botfactory';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = createBot(process.env.PASS_PHRASE);

// bot.command('start', (usr) => {
//   usr.reply('Hello, world!');
// });

bot.start();
