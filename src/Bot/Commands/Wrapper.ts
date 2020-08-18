import { TelegrafContext } from 'telegraf/typings/context';

export function start(context: TelegrafContext): void {
    let answerMessage = 'Здравствуйте ';

    if (context.from && context.from.username) {
        answerMessage += `${context.from.username}!`;
    }

    answerMessage += `\nЯ могу определять оператора и регион по номеру телефона, пришлите мне номер в любом формате`;

    context.reply(answerMessage);
}
