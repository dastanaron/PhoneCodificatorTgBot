import DatabaseConnection from './Components/Phone/DatabaseConnection';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import Launcher from './Bot/Launcher';

(async () => {
    const phoneDatabaseConnection = new DatabaseConnection(String(process.env.PHONE_DATABASE_PATH));
    await new Launcher(String(process.env.BOT_TOKEN), phoneDatabaseConnection).run();
})();
