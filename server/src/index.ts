import express, { Application } from 'express';
import { UserRoutes } from './routes/user';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import { sessionConfig } from './config/sessionConfig';

dotenv.config();

const app: Application = express();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5555", "*"],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}
app.use(cors(corsOptions));
app.use(session(sessionConfig));


app.use('/user', UserRoutes);

let PORT : string | undefined;
process.env.STATUS === 'dev'
? PORT = process.env.DEV_PORT
: PORT = process.env.PROD_PORT;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.STATUS} mode on port ${PORT}`)
})