import { Telegraf, Context } from 'telegraf';

import { start } from './Commands/Wrapper';

export default class Launcher {
    protected bot: Telegraf<Context>;

    constructor(botToken: string) {
        this.bot = new Telegraf(botToken);
    }

    async run(): Promise<void> {
        this.bot.start(start);
        this.runHandlers();
        await this.bot.launch();
    }

    private runHandlers(): void {
        this.bot.on('callback_query', (ctx) => {
            if (ctx.callbackQuery) {
                console.log(ctx.callbackQuery.from);
            }

            if (ctx.callbackQuery && ctx.callbackQuery.id) ctx.answerCbQuery(String(ctx.callbackQuery.id));
        });

        this.bot.on('inline_query', (ctx) => {
            ctx.reply('inline_query');
        });

        this.bot.hears('info', (ctx) =>
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
    }
}
