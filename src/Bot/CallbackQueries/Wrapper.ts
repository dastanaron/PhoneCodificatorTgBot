import { DataBaseInfo } from './DataBaseInfo';
import { UsersInfo } from './UsersInfo';
import { TelegrafContext } from 'telegraf/typings/context';
import { HandlerTransportObject } from './CallbackQueryAbstractHandler';
import { DataBaseConnection } from '../../Contracts/DataBaseConnection';

export class CallbackQueriesHandlerWrapper {
    protected handlers = [DataBaseInfo, UsersInfo];

    public run(
        context: TelegrafContext,
        phoneDataBaseConnection?: DataBaseConnection,
        botDataBAseConnection?: DataBaseConnection,
    ): void {
        if (context.callbackQuery) {
            const command = context.callbackQuery.data;

            const transportObject = {
                phoneDataBaseConnection: phoneDataBaseConnection,
                botDataBaseConnection: botDataBAseConnection,
                context: context,
            } as HandlerTransportObject;

            for (const handler of this.handlers) {
                if (handler.getCommand() === command) {
                    const instance = new handler(transportObject);
                    instance.run();
                }
            }
        }
    }
}

export default new CallbackQueriesHandlerWrapper();
