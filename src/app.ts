import express from 'express';
import * as bodyParser from 'body-parser';
import tasks from './routes/tasks';
import cors from 'cors';



const app = express();

app.use(cors());

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use('/', tasks);

export { app };