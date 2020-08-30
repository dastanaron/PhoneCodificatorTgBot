import { TelegrafContext } from 'telegraf/typings/context';
import DatabaseConnection from '../../Components/DataBaseConnection';

export interface MessageHandler {
    isValid(context: TelegrafContext): boolean;
    handle(context: TelegrafContext): void;
}

export interface UsingDatabase {
    setDatabaseConnection(db: DatabaseConnection): void;
}
