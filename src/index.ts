//eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import Launcher from "./Bot/Launcher";

(async () => {
    await (new Launcher(String(process.env.BOT_TOKEN))).run();
})();

