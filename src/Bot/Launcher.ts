import fs from 'fs';
import { Telegraf, Context } from 'telegraf';

import { start } from './Commands/Wrapper';
import { handleMessage } from './MessageHandlers/Wrapper';
import DatabaseConnection from '../Components/DataBaseConnection';
import BotDatabaseComponent from '../Components/BotDatabase/BotDatabaseComponent';
import PhoneComponent from '../Components/Phone/PhoneComponent';
import Utils from '../Services/Utils';

export default class Launcher {
    protected bot: Telegraf<Context>;
    protected phonesDBConnection: DatabaseConnection;
    protected botDBConnection: DatabaseConnection;

    constructor(botToken: string, phonesDBConnection: DatabaseConnection, botDBConnection: DatabaseConnection) {
        this.bot = new Telegraf(botToken);
        this.phonesDBConnection = phonesDBConnection;
        this.botDBConnection = botDBConnection;
    }

    async run(): Promise<void> {
        this.bot.start((context) => {
            start(context, this.botDBConnection);
        });

        this.configure();
        this.runHandlers();

        if (process.env.APP_ENV !== 'production') {
            await this.bot.launch();
        }
    }

    private configure(): void {
        if (process.env.APP_ENV === 'production') {
            this.bot.telegram.setWebhook(String(process.env.WEBHOOK_URL));
            this.bot.startWebhook(String(process.env.WEBHOOK_PATH), null, Number(process.env.INTERNAL_PORT));
        }
    }

    private runHandlers(): void {
        this.bot.on('callback_query', (ctx) => {
            if (ctx.callbackQuery) {
                switch (ctx.callbackQuery.data) {
                    case 'usersInfo':
                        const botDBComponent = new BotDatabaseComponent(this.botDBConnection);
                        const usersCount = botDBComponent.user.getUsersCount();
                        ctx.reply(`💁 Бота используют ${usersCount} пользователей`);
                        break;
                    case 'dbInfo':
                        const phoneComponent = new PhoneComponent(this.phonesDBConnection);
                        const recordsCount = Utils.number.divideIntoBits(phoneComponent.getCountRecords());
                        ctx.reply(`📲 В базе ${recordsCount} известных диапазонов номеров`);
                        break;
                }
            }

            if (ctx.callbackQuery && ctx.callbackQuery.id) ctx.answerCbQuery(String(ctx.callbackQuery.id));
        });

        this.bot.on('inline_query', (ctx) => {
            ctx.reply('inline_query');
        });

        this.bot.hears(['info', 'инфо'], (ctx) =>
            ctx.getChat().then((res) => {
                ctx.reply('Какая вам нужна информация?', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '👨👩🏻‍🦰 Пользователи',
                                    callback_data: 'usersInfo',
                                },
                                {
                                    text: '🗄 База данных',
                                    callback_data: 'dbInfo',
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
