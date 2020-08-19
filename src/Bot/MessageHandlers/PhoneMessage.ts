import { MessageHandler, UsingDatabase } from './Contracts';
import { TelegrafContext } from 'telegraf/typings/context';
import { CountryCode, NationalNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { DataBaseConnection } from '../../Contracts/DataBaseConnection';
import PhoneComponent, { PhoneEntity } from '../../Components/Phone/PhoneComponent';

export default class PhoneMessage implements MessageHandler, UsingDatabase {
    protected static _db: DataBaseConnection;

    public setDatabaseConnection(db: DataBaseConnection): void {
        PhoneMessage._db = db;
    }

    public isValid(context: TelegrafContext): boolean {
        if (!context.message) {
            return false;
        }

        if (context.message.text) {
            return context.message.text.search(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/m) > -1;
        }

        return false;
    }

    public handle(context: TelegrafContext): void {
        if (!context.message || !context.message.text) {
            throw Error('Undefined context message in the PhoneMessage handler');
        }

        if (context.message.text.search(/\n/) === -1) {
            const normalizedPhone = this.normalizePhone(context.message.text);

            if (normalizedPhone === null) {
                context.reply('Упс, не удалось разобрать этот номер');
                return;
            }
            this.handleOnePhone(normalizedPhone, context);
        } else {
            const rawPhones = context.message.text.split('\n');
            const phones = [];

            for (const rawPhone of rawPhones) {
                const normalizedPhone = this.normalizePhone(rawPhone);
                if (normalizedPhone !== null) {
                    phones.push(normalizedPhone);
                }
            }
            this.handleManyPhones(phones, context);
        }
    }

    private normalizePhone(phoneNumber: string, country: CountryCode = 'RU'): NationalNumber | null {
        const parsedPhone = parsePhoneNumberFromString(phoneNumber.replace(/^7/, ''), country);
        return parsedPhone ? parsedPhone.nationalNumber : null;
    }

    private handleOnePhone(normalizedPhone: NationalNumber, context: TelegrafContext): void {
        const phoneComponent = new PhoneComponent(PhoneMessage._db);
        const phoneEntity = phoneComponent.checkPhone(normalizedPhone.toString());

        if (phoneEntity) {
            context.reply(this.stringifyPhoneEntity(phoneEntity), { parse_mode: 'HTML' });
        } else {
            context.reply(`Упс! Произошла ошибка обработки номера: ${normalizedPhone}`);
        }
    }

    private stringifyPhoneEntity(entity: PhoneEntity): string {
        let result = `☎️ <b>Телефон</b>: ${entity.phone}\n`;

        if (entity.operator) {
            result += `📱 <b>Оператор</b>: ${entity.operator}\n`;
        }

        if (entity.region) {
            result += `🇷🇺 <b>Регион</b>: ${entity.region}\n`;
        }

        return result;
    }

    private handleManyPhones(phones: NationalNumber[], context: TelegrafContext): void {
        const phoneComponent = new PhoneComponent(PhoneMessage._db);
        if (phones.length > 10) {
            context.reply('Для больше 10 телефонов, в будущем будет формироваться Excel файл, но пока не реализовано');
        } else {
            let answerMessage = '';
            for (const phone of phones) {
                const phoneEntity = phoneComponent.checkPhone(phone.toString());
                if (phoneEntity) {
                    answerMessage += `${this.stringifyPhoneEntity(phoneEntity)}\n\n`;
                }
            }
            context.reply(answerMessage, { parse_mode: 'HTML' });
        }
    }
}
