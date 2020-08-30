import { DataBaseConnection } from '../../Contracts/DataBaseConnection';
import DatabaseBuilder from './DatabaseBuilder';
import UserRepository from './Repository/User';
import User from './Entity/User';

export default class BotDatabaseComponent {
    protected db: DataBaseConnection;
    protected dbBuilder: DatabaseBuilder;

    constructor(database: DataBaseConnection) {
        this.db = database;
        this.dbBuilder = new DatabaseBuilder(this.db);
    }

    public prepareUserTable(): void {
        this.dbBuilder.prepareUserTable();
    }

    public createUserModel(): User {
        return new User();
    }

    get user(): UserRepository {
        return new UserRepository(this.db);
    }
}
