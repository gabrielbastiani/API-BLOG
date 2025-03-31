import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';
import path from 'path';
import "./services/post/PostPublishScheduler";
import cron from "node-cron";
import { StartMarketingPublicationScheduler } from './services/marketing_publication/StartMarketingPublicationScheduler';
import { EndMarketingPublicationScheduler } from './services/marketing_publication/EndMarketingPublicationScheduler';
const startScheduler = new StartMarketingPublicationScheduler();
const endScheduler = new EndMarketingPublicationScheduler();

const app = express();

// Configuração essencial para proxies e CORS
app.set('trust proxy', true); // Confia em proxies reversos (Nginx, Heroku, etc)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', process.env.URL_SITE);
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cors());
app.use(express.json());

// Rotas
app.use(router);

// Servir arquivos estáticos
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'images'))
);

// Middleware de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
cron.schedule("* * * * *", async () => {
    await startScheduler.execute();

    setTimeout(async () => {
        await endScheduler.execute();
    }, 10000);
});

// Inicia o servidor
app.listen(process.env.PORT || 3333, () => console.log('Servidor online!!!!'));