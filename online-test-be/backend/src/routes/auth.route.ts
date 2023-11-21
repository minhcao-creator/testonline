// import { loginHadelling } from '../controllers/login.controller';
// // import bodyParser from "body-parser";
// import session from "express-session";
// import FileStoreFactory from 'session-file-store';
// import  app  from './index.route';

// app.post('/login', loginHadelling);

import express from 'express';
import { loginHadelling } from '../controllers/login.controller';

export const authRouter = express.Router();

authRouter.post('/login', loginHadelling);