import BetterSqlite3, { Database } from 'better-sqlite3';
import { DataBaseConnection } from '../../Contracts/DataBaseConnection';

export default class PhoneDatabaseConnection implements DataBaseConnection {
    protected db: Database;

    constructor(databasePath: string) {
        this.db = BetterSqlite3(databasePath);
    }

    public getConnection(): Database {
        return this.db;
    }
}
