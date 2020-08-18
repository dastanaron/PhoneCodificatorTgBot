//eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Telegraf } from 'telegraf';

const bot = new Telegraf(String(process.env.BOT_TOKEN));

bot.start((ctx) => ctx.reply('Welcome'));

bot.on('callback_query', (ctx) => {
    if (ctx.callbackQuery && ctx.callbackQuery.id) ctx.answerCbQuery(String(ctx.callbackQuery.id));
});

bot.on('inline_query', (ctx) => {
    ctx.reply('inline_query');
});

bot.hears('info', (ctx) =>
    ctx.getChat().then((res) => {
        ctx.reply(String(res.id), {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'test',
                            callback_data: 'like',
                        },
                    ],
                ],
            },
        });
    }),
);
bot.launch();
