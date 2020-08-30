import fs from 'fs';
import { Telegraf, Context } from 'telegraf';

import { start } from './Commands/Wrapper';
import { handleMessage } from './MessageHandlers/Wrapper';
import DatabaseConnection from '../Components/Phone/DatabaseConnection';

export default class Launcher {
    protected bot: Telegraf<Context>;
    protected phonesDBConnection: DatabaseConnection;

    constructor(botToken: string, phonesDBConnection: DatabaseConnection) {
        this.bot = new Telegraf(botToken);
        this.phonesDBConnection = phonesDBConnection;
    }

    async run(): Promise<void> {
        this.bot.start(start);
        this.configure();
        this.runHandlers();
        await this.bot.launch();
    }

    private configure(): void {
        if (process.env.APP_ENV === 'production') {
            this.bot.telegram.setWebhook(String(process.env.WEBHOOK_URL));
            this.bot.startWebhook(String(process.env.WEBHOOK_PATH), null, Number(process.env.INTERNAL_PORT))
        }
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

        this.bot.on('message', (ctx) => {
            handleMessage(ctx, this.phonesDBConnection);
        });
    }
}
