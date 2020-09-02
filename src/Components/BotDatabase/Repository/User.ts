import { DataBaseConnection } from '../../../Contracts/DataBaseConnection';
import User from '../Entity/User';
import { BOT_USERS_TABLE } from '../DatabaseBuilder';

export default class UserRepository {
    private db: DataBaseConnection;

    constructor(database: DataBaseConnection) {
        this.db = database;
    }

    public saveModel(user: User): void {
        const currentModel = this.getUserByTgId(user.tgUserId);
        if (currentModel === null) {
            this.insertModel(user);
        } else {
            this.updateModel(user);
        }
    }

    public insertModel(user: User): void {
        const stmt = this.db.getConnection().prepare(`
            INSERT INTO ${BOT_USERS_TABLE}
            ('tg_user_id', 'username', 'first_name', 'last_name', 'is_bot', 'language_code', 'created_at')
            VALUES
            (?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
            user.tgUserId,
            user.username,
            user.firstName,
            user.lastName,
            Number(user.isBot),
            user.languageCode,
            user.createdAt.toISOString(),
        );
    }

    public updateModel(user: User): void {
        const stmt = this.db.getConnection().prepare(`
            UPDATE ${BOT_USERS_TABLE}
            SET 'username'=?, 'first_name'=?, 'last_name'=?, 'is_bot'=?, 'language_code'=?
            WHERE tg_user_id=?;
        `);
        stmt.run(user.username, user.firstName, user.lastName, Number(user.isBot), user.languageCode, user.tgUserId);
    }

    public insertModels(users: User[]): void {
        const connection = this.db.getConnection();

        try {
            connection.exec('BEGIN');

            for (const user of users) {
                this.insertModel(user);
            }

            connection.exec('COMMIT');
        } catch (exception) {
            connection.exec('ROLLBACK');
            throw exception;
        }
    }

    public getUsersCount(): number {
        const stmt = this.db.getConnection().prepare(`select count(*) as records_count from ${BOT_USERS_TABLE}`);
        return Number(stmt.get().records_count);
    }

    public getUserByTgId(tgId: number): User | null {
        const row = this.db.getConnection().prepare(`SELECT * FROM ${BOT_USERS_TABLE} where tg_user_id = ?`).get(tgId);
        if (!row) {
            return null;
        }

        const user = new User();

        if (row.tg_user_id) {
            user.tgUserId = Number(row.tg_user_id);
        }

        if (row.username) {
            user.username = row.username;
        }

        if (row.first_name) {
            user.firstName = row.first_name;
        }

        if (row.last_name) {
            user.lastName = row.last_name;
        }

        if (row.is_bot) {
            user.isBot = Boolean(row.is_bot);
        }

        if (row.language_code) {
            user.languageCode = row.language_code;
        }

        if (row.created_at) {
            user.createdAt = new Date(row.created_at);
        }

        return user;
    }
}
