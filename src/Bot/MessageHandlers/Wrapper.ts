import { TelegrafContext } from 'telegraf/typings/context';
import PhoneMessage from './PhoneMessage';
import { DataBaseConnection } from '../../Contracts/DataBaseConnection';

const handlers = [new PhoneMessage()];

export function handleMessage(context: TelegrafContext, phoneDataBase: DataBaseConnection): void {
    for (const handler of handlers) {
        if (handler.isValid(context)) {
            if (typeof handler['setDatabaseConnection'] === 'function') {
                handler.setDatabaseConnection(phoneDataBase);
            }
            handler.handle(context);
        }
    }
}
