import 'dotenv/config';
import { createApp } from './src/infrastructure/http/app';

const server = createApp();
const PORT = process.env.PORT || 3020;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})