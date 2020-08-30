import { DataBaseConnection } from '../../Contracts/DataBaseConnection';

export const BOT_USERS_TABLE = 'tg_users';

export default class DatabaseBuilder {
    protected db: DataBaseConnection;

    constructor(database: DataBaseConnection) {
        this.db = database;
    }

    public prepareUserTable(): void {
        const tableInfo = this.db.getConnection().prepare(`pragma table_info("${BOT_USERS_TABLE}")`).all();
        if (tableInfo === undefined || tableInfo.length === 0) {
            this.createUserTableTable();
        }
    }

    private createUserTableTable(): void {
        this.db.getConnection().exec(`CREATE TABLE IF NOT EXISTS ${BOT_USERS_TABLE} (
         'id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
         'tg_user_id' INTEGER,
         'username' TEXT,
         'first_name' TEXT,
         'last_name' TEXT,
         'is_bot' INTEGER,
         'language_code' TEXT,
         'created_at' DATETIME
        )`);
    }
}
