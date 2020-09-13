import { CallbackQueryAbstractHandler } from './CallbackQueryAbstractHandler';
import PhoneComponent from '../../Components/Phone/PhoneComponent';
import Utils from '../../Services/Utils';

export class DataBaseInfo extends CallbackQueryAbstractHandler {
    protected static command = 'dbInfo';

    public run(): void {
        if (!this.transportObject.phoneDataBaseConnection) {
            throw new Error('PhoneDatabase connection is undefined');
        }
        const phoneComponent = new PhoneComponent(this.transportObject.phoneDataBaseConnection);
        const recordsCount = Utils.number.divideIntoBits(phoneComponent.getCountRecords());
        this.transportObject.context.reply(`📲 В базе ${recordsCount} известных диапазонов номеров`);
    }
}
