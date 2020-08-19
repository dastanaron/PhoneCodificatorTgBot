import { Database } from 'better-sqlite3';

export interface DataBaseConnection {
    getConnection(): Database;
}
