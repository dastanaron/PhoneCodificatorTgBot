import BetterSqlite3, { Database } from 'better-sqlite3';
import { DataBaseConnection as ConnectionInterface } from '../Contracts/DataBaseConnection';

export default class DatabaseConnection implements ConnectionInterface {
    protected db: Database;

    constructor(databasePath: string) {
        this.db = BetterSqlite3(databasePath);
    }

    public getConnection(): Database {
        return this.db;
    }
}
