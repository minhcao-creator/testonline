import { NextFunction, Request, Response } from 'express';
import mysql from 'mysql2';
import Pool from '../config/Pool.config';

export const loginHadelling = async (req: Request, res: Response, next: NextFunction) => {
  let conn = mysql.createPool(Pool);

  if (req.body.isTeacher) {
    console.log(22222);
    const loginCallback = (result: any, err: any) => {
      if (err) {
        console.error('Error:', err);
      } else {
        if (result !== null) {
          req.session.currentStudent = result;
          res.send({ isTeacher: true, currentUser: result });
          return;
        }
        res.send('Fail');
      }
    };
    LoginTeacher(conn, req.body.username, req.body.password, loginCallback);
  } else {
    console.log(11111);
    const loginCallback = (result: any, err: any) => {
      if (err) {
        console.error('Error:', err);
      } else {
        if (result !== null) {
          req.session.currentTeacher = result;
          res.send({ isTeacher: false, currentUser: result });
          return;
        }
        res.send('Fail');
      }
    };
    LoginStudent(conn, req.body.username, req.body.password, loginCallback);
  }
};

function LoginStudent(
  conn: mysql.Pool,
  username: string,
  password: string,
  callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
): void {
  conn = mysql.createPool(Pool);
  conn.query('select * from Student where username= ? and password = ?', [username, password], (err, res) => {
    if (err) {
      callback(null, err);
    } else {
      callback(res as mysql.RowDataPacket[], null);
      // return res;
    }
  });
}

function LoginTeacher(
  conn: mysql.Pool,
  username: string,
  password: string,
  callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
): void {
  conn = mysql.createPool(Pool);
  conn.query('select * from Teacher where username= ? and password = ?', [username, password], (err, res) => {
    if (err) {
      callback(null, err);
    } else {
      callback(res as mysql.RowDataPacket[], null);
      // return res;
    }
  });
}
