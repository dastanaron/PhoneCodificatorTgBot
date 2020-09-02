import { DataBaseConnection } from '../../Contracts/DataBaseConnection';
import { BOT_USERS_TABLE } from '../BotDatabase/DatabaseBuilder';

export const PHONES_TABLE = 'phones';

export default class PhoneComponent {
    protected db: DataBaseConnection;

    constructor(database: DataBaseConnection) {
        this.db = database;
    }

    public checkPhone(phoneNumber: string): PhoneEntity | null {
        const row = this.db
            .getConnection()
            .prepare(`select operator, region from ${PHONES_TABLE} where "from" <= ? and "to" >= ?`)
            .get(phoneNumber, phoneNumber);
        if (!row) {
            return null;
        }

        const entity = {
            phone: phoneNumber,
        } as PhoneEntity;

        if (row.operator) {
            entity.operator = row.operator;
        }

        if (row.region) {
            entity.region = row.region.replace(/\*/, '|');
        }

        return entity;
    }

    public getCountRecords(): number {
        const stmt = this.db.getConnection().prepare(`select count(*) as records_count from ${PHONES_TABLE}`);
        return Number(stmt.get().records_count);
    }
}

export interface PhoneEntity {
    phone: string;
    region?: string;
    operator?: string;
}
