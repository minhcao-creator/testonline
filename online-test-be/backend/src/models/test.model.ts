import mysql, { RowDataPacket } from 'mysql2';
import Pool from '../config/Pool.config';

class TestModel {
  conn: mysql.Pool;

  constructor() {
    this.conn = mysql.createPool(Pool);
  }

  destroy() {
    if (this.conn) {
      this.conn.end((err) => {
        if (err) {
          console.error('Error closing MySQL connection:', err);
        } else {
          console.log('MySQL connection closed');
        }
      });
    }
  }

  updateTest(
    id: string,
    title: string,
    period: string,
    passCode: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    const sql = 'UPDATE Test SET title = ?, period = ?, passCode=? WHERE Test.id=?;';
    this.conn.query(sql, [title, period, passCode, id], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  getAllTest(
    classId: string,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    const sql = 'SELECT * FROM Test WHERE Test.classId=?';

    this.conn.query(sql, [classId], (err, results) => {
      if (err) {
        // Xử lý lỗi khi có lỗi truy vấn
        console.error('Error executing SQL query:', err);
        callback(null, err);
      } else {
        // Kết quả truy vấn thành công
        callback(results as mysql.RowDataPacket[], null);
      }
    });
  }

  createTest(
    classId: string,
    title: string,
    period: number | null,
    start: string | null,
    end: string | null,
    passCode: string | null,
    questions:
      | {
          title: string;
          answers: { description: string; isCorrect: boolean | undefined | null }[] | undefined | null;
        }[]
      | null,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    sql += `call addTest(?,?,?,?,?,?);`;
    params.push(title, period, start, end, passCode, classId);
    if (questions) {
      for (let i: number = 0; i < questions.length; i++) {
        sql += `insert into Question values(concat('QUESTION',?),concat('TEST',(select count(*) from Test)),?,?);`;
        params.push(i + 1, classId, questions[i].title);
        if (questions[i].answers) {
          for (let j: number = 0; j < questions[i].answers!.length; j++) {
            sql += `insert into Answer values(concat('ANSWER',?),?,?,concat('QUESTION',?),concat('TEST',(select count(*) from Test)),?);`;
            params.push(
              j + 1,
              questions[i].answers![j].description,
              questions[i].answers![j].isCorrect === undefined ? null : questions[i].answers![j].isCorrect,
              i + 1,
              classId
            );
          }
        }
      }
    }
    this.conn.query(sql, params, (err, result) => {
      if (err) callback(null, err);
      else callback(result as mysql.ResultSetHeader[], null);
    });
  }

  addQuestion(
    questions: {
      title: string;
      answers: { description: string; isCorrect: boolean | null | undefined }[] | null | undefined;
    }[],
    testId: string,
    classId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    for (let i: number = 0; i < questions.length; i++) {
      sql += `call addQuestion(?,?,?);`;
      params.push(testId, classId, questions[i].title);
      if (questions[i].answers !== null && questions[i].answers !== undefined) {
        for (let j: number = 0; j < questions[i].answers!.length; j++) {
          sql += `insert into Answer values(concat('ANSWER',?),?,?,concat('QUESTION',(select
          count(*) from Question where testId=? and classId=?
        )),?,?);`;
          params.push(
            j + 1,
            questions[i].answers![j].description,
            questions[i].answers![j].isCorrect === undefined ? null : questions[i].answers![j].isCorrect,
            testId,
            classId,
            testId,
            classId
          );
        }
      }
    }
    if (sql !== ``)
      this.conn.query(sql, params, (err, result) => {
        if (err) callback(null, err);
        else callback(result as mysql.ResultSetHeader[], null);
      });
  }

  addAnswer(
    answers: { description: string; isCorrect: boolean | null | undefined }[],
    questionId: string,
    testId: string,
    classId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    for (let i: number = 0; i < answers.length; i++) {
      sql += `call addAnswer(?,?,?,?,?);`;
      params.push(
        answers[i].description,
        answers[i].isCorrect === undefined ? null : answers[i].isCorrect,
        questionId,
        testId,
        classId
      );
    }
    if (sql !== ``)
      this.conn.query(sql, params, (err, result) => {
        if (err) callback(null, err);
        else callback(result as mysql.ResultSetHeader[], null);
      });
  }

  deleteTest(
    classId: string,
    testId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query('delete from Test where id=? and classId=?', [testId, classId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  getAllQuestion(
    classId: string,
    testId: string,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `SELECT * FROM Question
      WHERE Question.classId=? AND Question.testId=?`,
      [classId, testId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.RowDataPacket[], null);
      }
    );
  }

  deleteQuestion(
    classId: string,
    testId: string,
    questionId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      'delete from Question where id=? and testId=? and classId=?',
      [questionId, testId, classId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      }
    );
  }

  deleteAnswer(
    classId: string,
    testId: string,
    questionId: string,
    answerId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      'delete from Answer where questionId=? and testId=? and id=? and classId=?',
      [questionId, testId, answerId, classId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      }
    );
  }

  getQuestion(
    classId: string,
    testId: string,
    questionId: string | null,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    if (questionId)
      this.conn.query(
        `select Question.id as questionId,Question.title, Answer.id as answerId, Answer.description, Answer.isCorrect
      from Question join Answer on Question.id=Answer.questionId and Question.testId=Answer.testId
      where Question.id =? and Question.testId =? and Question.classId=? order by questionId,answerId`,
        [questionId, testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
    else
      this.conn.query(
        `select Question.id as questionId,Question.title,Answer.id as answerId,Answer.description,Answer.isCorrect
            from Test
            join Question on Question.testId=Test.id
            join Answer on Answer.testId=Question.testId and Answer.questionId=Question.id
            where Test.id=? and Test.classId=? order by questionId,answerId`,
        [testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
  }

  updateAnswer(
    classId: string,
    testId: string,
    questionId: string,
    answerId: string,
    description: string | null,
    isCorrect: boolean | null,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    if (description) {
      sql += `update Answer set description=? where id=? and questionId=? and testId=? and classId=?;`;
      params.push(description, answerId, questionId, testId, classId);
    }
    if (isCorrect !== null) {
      sql += `update Answer set isCorrect=? where id=? and questionId=? and testId=? and classId=?;`;
      params.push(isCorrect, answerId, questionId, testId, classId);
    }
    if (sql !== ``)
      this.conn.query(sql, params, (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      });
  }

  updateQuestion(
    classId: string,
    testId: string,
    questionId: string,
    title: string | null,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    if (title)
      this.conn.query(
        `update Question set title=? where id=? and testId=? and classId=?`,
        [title, questionId, testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.ResultSetHeader[], null);
        }
      );
  }

  getStudentScore(
    classId: string,
    testId: string,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select Student.name,StudentTest.score,StudentTest.dateOfSubmit from StudentTest join Student on Student.id=StudentTest.StudentId where StudentTest.classId=? and StudentTest.testId=?;`,
      [classId, testId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.RowDataPacket[], null);
      }
    );
  }

  studentSubmitAnswer(
    classId: string,
    testId: string,
    studentId: string,
    choices: { questionId: string; answerId: string | null | undefined }[],
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    for (let i: number = 0; i < choices.length; i++) {
      sql += `call submitAnswer(?,?,?,?,?);`;
      params.push(
        classId,
        testId,
        studentId,
        choices[i].questionId,
        choices[i].answerId === undefined ? null : choices[i].answerId
      );
    }
    if (sql !== ``)
      this.conn.query(sql, params, (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      });
  }

  testGrading(
    classId: string,
    testId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {}

  passCodeTest(
    classId: string,
    testId: string,
    passCode: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select * from Test where classId=? and id=? and passCode=?;`,
      [classId, testId, passCode],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      }
    );
  }

  getTestClass(
    classId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`select * from Test where classId=?;`, [classId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }
}

export { TestModel };
