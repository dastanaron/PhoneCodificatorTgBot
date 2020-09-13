import { CallbackQueryAbstractHandler } from './CallbackQueryAbstractHandler';
import BotDatabaseComponent from '../../Components/BotDatabase/BotDatabaseComponent';

export class UsersInfo extends CallbackQueryAbstractHandler {
    protected static command = 'usersInfo';

    public run(): void {
        if (!this.transportObject.botDataBaseConnection) {
            throw new Error('Bot database connection is undefined');
        }

        const botDBComponent = new BotDatabaseComponent(this.transportObject.botDataBaseConnection);
        const usersCount = botDBComponent.user.getUsersCount();
        this.transportObject.context.reply(`💁 Бота используют ${usersCount} пользователей`);
    }
}
