import 'express-session';
import UserModel from '../models/user.model'
declare module 'express-session' {
      interface SessionData
      {
            currentStudent: UserModel;
            currentTeacher: UserModel;
      }
}