import { DataBaseConnection } from '../../Contracts/DataBaseConnection';
import { TelegrafContext } from 'telegraf/typings/context';

export abstract class CallbackQueryAbstractHandler {
    protected static command = '';

    protected transportObject: HandlerTransportObject;

    constructor(transportObject: HandlerTransportObject) {
        this.transportObject = transportObject;
    }

    public static getCommand(): string {
        return this.command;
    }

    public abstract run(): void;
}

export interface HandlerTransportObject {
    phoneDataBaseConnection?: DataBaseConnection;
    botDataBaseConnection?: DataBaseConnection;
    context: TelegrafContext;
}
