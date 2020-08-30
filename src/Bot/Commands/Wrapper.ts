import { TelegrafContext } from 'telegraf/typings/context';
import { DataBaseConnection } from '../../Contracts/DataBaseConnection';
import BotDatabaseComponent from '../../Components/BotDatabase/BotDatabaseComponent';

export function start(context: TelegrafContext, botDatabase: DataBaseConnection): void {
    let answerMessage = 'Здравствуйте ';

    if (context.from && context.from.username) {
        answerMessage += `${context.from.username}!`;

        const botDBComponent = new BotDatabaseComponent(botDatabase);

        const user = botDBComponent.createUserModel();

        user.tgUserId = context.from.id;
        user.firstName = context.from.first_name;
        user.lastName = String(context.from.last_name);
        user.username = context.from.username;
        user.isBot = context.from.is_bot;
        user.languageCode = context.from.language_code || 'en';

        botDBComponent.user.saveModel(user);
    }

    answerMessage += `\nЯ могу определять оператора и регион по номеру телефона, пришлите мне номер в любом формате`;

    context.reply(answerMessage);
}
