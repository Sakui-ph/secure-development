import express, { Application } from 'express';
import { UserRoutes } from './routes/user';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use('/user', UserRoutes);

let PORT : string | undefined;
process.env.STATUS === 'dev'
? PORT = process.env.DEV_PORT
: PORT = process.env.PROD_PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.STATUS} mode on port ${PORT}`)
})