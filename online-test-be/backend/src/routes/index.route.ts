import express, { Request, Response } from 'express';
import { Express } from 'express';
import { testRouter } from './test.route';
import path from 'path';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';
import { authRouter } from './auth.route';

const port: number = 8080;
const FileStore: FileStoreFactory.FileStore = FileStoreFactory(session);
export const app: Express = express();

app.use(express.json());
app.use(
  session({
    store: new FileStore({
      path: path.join(__dirname, 'model', 'sessions')
    }),
    secret: 'uwc-enhanced-edition',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000 * 24 * 3
    }
  })
);

app.use('/auth', authRouter);
app.use('/test', testRouter);

export default app;

// import express from 'express';
// import { testRouter } from './test.route';
// import { authRouter } from './auth.route';

// const router = express.Router();

// router.use('/test', testRouter);
// router.use('/auth', authRouter);

// export default router;
