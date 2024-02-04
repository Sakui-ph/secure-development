import express, { Application } from 'express';
import { UserRoutes } from './routes/user';

const app: Application = express();
const port = 5000;

app.use('/user', UserRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})