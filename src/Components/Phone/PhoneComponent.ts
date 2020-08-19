import { DataBaseConnection } from '../../Contracts/DataBaseConnection';

export default class PhoneComponent {
    protected db: DataBaseConnection;

    constructor(database: DataBaseConnection) {
        this.db = database;
    }

    public checkPhone(phoneNumber: string): PhoneEntity | null {
        const row = this.db
            .getConnection()
            .prepare('select operator, region from phones where `from` <= ? and `to` >= ?')
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
}

export interface PhoneEntity {
    phone: string;
    region?: string;
    operator?: string;
}
