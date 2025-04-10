"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
require("./services/post/PostPublishScheduler");
const node_cron_1 = __importDefault(require("node-cron"));
const StartMarketingPublicationScheduler_1 = require("./services/marketing_publication/StartMarketingPublicationScheduler");
const EndMarketingPublicationScheduler_1 = require("./services/marketing_publication/EndMarketingPublicationScheduler");
const startScheduler = new StartMarketingPublicationScheduler_1.StartMarketingPublicationScheduler();
const endScheduler = new EndMarketingPublicationScheduler_1.EndMarketingPublicationScheduler();
const app = (0, express_1.default)();
// Configuração essencial para proxies e CORS
app.set('trust proxy', true); // Confia em proxies reversos (Nginx, Heroku, etc)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.URL_SITE);
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use(routes_1.router);
// Servir arquivos estáticos
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'images')));
// Middleware de erros
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
// Agendadores
node_cron_1.default.schedule("* * * * *", async () => {
    await startScheduler.execute();
    setTimeout(async () => {
        await endScheduler.execute();
    }, 10000);
});
// Inicia o servidor
app.listen(process.env.PORT || 3333, () => console.log('Servidor online!!!!'));
//# sourceMappingURL=server.js.map