import 'dotenv/config'; // For development. In production, we can change the start script in Node new versions to add the .env: "node --env-file .env src/index.js"

import { bootstrap } from './app/app';

const start = async () => {
    try {
        const { url } = await bootstrap(); // bootstrap can take port number as a parameter
        console.log(`Server is running on ${url}`);

    } catch (error) {
        console.log('An error ocurred:', error);
        process.exit(1);
    }
};

start();