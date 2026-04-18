import 'dotenv/config';
import { createApp } from './src/infrastructure/http/app';

const app = createApp();
const PORT = process.env.PORT || 3020;

if (import.meta.main) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;