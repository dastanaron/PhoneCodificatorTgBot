import DatabaseConnection from './Components/DataBaseConnection';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import Launcher from './Bot/Launcher';
import BotDatabaseComponent from './Components/BotDatabase/BotDatabaseComponent';

(async () => {
    const phoneDatabaseConnection = new DatabaseConnection(String(process.env.PHONE_DATABASE_PATH));
    const botDatabaseConnection = new DatabaseConnection(String(process.env.BOT_DATABASE_PATH));

    new BotDatabaseComponent(botDatabaseConnection).prepareUserTable();

    await new Launcher(String(process.env.BOT_TOKEN), phoneDatabaseConnection, botDatabaseConnection).run();
})();
