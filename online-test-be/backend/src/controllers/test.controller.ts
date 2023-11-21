import { NextFunction, Request, Response } from 'express';
import { AppError } from '../config/AppError'; // throw error: throw new AppError(<statusCode>,<message>);
import { TestModel } from '../models/test.model';

const model: TestModel = new TestModel();

export const updateTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.params.id;

    const title = req.body.params.title;
    const period = req.body.params.period;
    const passCode = req.body.params.passCode;
    model.updateTest(id, title, period, passCode, (result, err) => {
      if (!err) res.status(200).send({ data: result });
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = req.body.params.classId;
    model.getAllTest(classId, (result, err) => {
      if (!err) res.status(200).send({ data: result });
    });
  } catch (error) {
    next(error);
  }
};

type Question = {
  title: string;
  answers:
    | Array<{
        description: string;
        isCorrect: boolean | undefined | null;
      }>
    | undefined
    | null;
};

interface TestParams {
  classId: string;
  title: string;
  period: number | null;
  start: string | null;
  end: string | null;
  passCode: string | null;
  questions: Question[] | null;
}

export const createTest = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body.params);

  try {
    const {
      classId,
      title,
      period = null,
      start = null,
      end = null,
      passCode = null,
      questions = null
    }: TestParams = req.body.params;

    model.createTest(classId, title, period, start, end, passCode, questions, (result, err) => {
      if (!err) {
        res.status(200).send({ message: 'Test created!' });
      } else {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    model.getAllQuestion(classId, testId, (result, err) => {
      if (!err) res.status(200).send({ data: result });
    });
  } catch (error) {
    next(error);
  }
};

export const addQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions: {
      title: string;
      answers: { description: string; isCorrect: boolean | null | undefined }[] | null | undefined;
    }[] = req.body.params.questions;
    const testId: string = req.body.params.testId;
    const classId: string = req.body.params.classId;
    model.addQuestion(questions, testId, classId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Question(s) added!' });
    });
  } catch (error) {
    next(error);
  }
};

export const addAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const answers: { description: string; isCorrect: boolean | null | undefined }[] = req.body.params.answers;
    const questionId: string = req.body.params.questionId;
    const testId: string = req.body.params.testId;
    const classId: string = req.body.params.classId;
    model.addAnswer(answers, questionId, testId, classId, (result, err) => {
      if (!err) res.status(200).send({ message: 'TAnswer(s) added!' });
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    model.deleteTest(classId, testId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Test deleted!' });
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const questionId: string = req.body.params.questionId;
    model.deleteQuestion(classId, testId, questionId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Question deleted!' });
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const questionId: string = req.body.params.questionId;
    const answerId: string = req.body.params.answerId;
    model.deleteAnswer(classId, testId, questionId, answerId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Answer deleted!' });
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const questionId: string | null = req.body.params.questionId || null;
    model.getQuestion(classId, testId, questionId, (result, err) => {
      if (!err) res.status(200).send({ data: result });
    });
  } catch (error) {
    next(error);
  }
};

export const updateAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const questionId: string = req.body.params.questionId;
    const answerId: string = req.body.params.answerId;
    const description: string | null = req.body.params.description || null;
    const isCorrect: boolean | null = req.body.params.isCorrect || null;
    model.updateAnswer(classId, testId, questionId, answerId, description, isCorrect, (result, err) => {
      if (!err) res.status(200).send({ message: 'Answer updated!' });
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const questionId: string = req.body.params.questionId;

    const title: string = req.body.params.title;
    model.updateQuestion(classId, testId, questionId, title, (result, err) => {
      if (!err) res.status(200).send({ message: 'Question title updated!' });
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentScore = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    model.getStudentScore(classId, testId, (result, err) => {
      if (!err) res.status(200).send({ data: result });
    });
  } catch (error) {
    next(error);
  }
};

export const studentSubmitAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const studentId: string = req.body.params.studentId;
    const choices: { questionId: string; answerId: string | null | undefined }[] = req.body.params.choices;
    model.studentSubmitAnswer(classId, testId, studentId, choices, (result, err) => {
      if (!err) res.status(200).send({ message: 'Student answers submitted!' });
    });
  } catch (error) {
    next(error);
  }
};

export const testGrading = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    model.testGrading(classId, testId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Test grading completed!' });
    });
  } catch (error) {
    next(error);
  }
};

export const passCodeTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    const passCode: string = req.body.params.passCode;
    model.passCodeTest(classId, testId, passCode, (result, err) => {
      if (!err) {
        if (result && result.length > 0) {
          res.status(200).send({ message: 'Passcode correct' });
        } else {
          res.status(401).send({ message: 'Passcode incorrect' });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTestClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    model.getTestClass(classId, (result, err) => {
      if (!err) {
        res.status(200).send({ testClass: result });
      }
    });
  } catch (error) {
    next(error);
  }
};
