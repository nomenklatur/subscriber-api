import express from 'express';
import cors from 'cors';
import { createContainer } from '../container';

export function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const serviceContainer = createContainer();

    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', runtime: 'bun' });
    });

    app.post('/api/v1/subscribe', serviceContainer.subscriberController.subscribe);

    return app;
}