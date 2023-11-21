import express from 'express';
import {
  createTest,
  deleteTest,
  deleteQuestion,
  deleteAnswer,
  getQuestion,
  addQuestion,
  addAnswer,
  updateQuestion,
  updateAnswer,
  getStudentScore,
  studentSubmitAnswer,
  testGrading,
  passCodeTest,
  getTestClass,
  getAllTest,
  updateTest,
  getAllQuestion
} from '../controllers/test.controller';
export const testRouter = express.Router();

// Note: var?:<type> means that the `var` property don't have to be in the `params` property in order to use the API

// URL for these APIs: <server-base-url>/test/<API url> (e.g. http://localhost:4001/test/createTest)

testRouter.post('/getAllTest', getAllTest);
testRouter.post('/updateTest', updateTest);
testRouter.post('/getAllQuestion', getAllQuestion);

/*
      Use: Create a test
      Properties: 
      - classId:string
      - title:string
      - period?:number|null
      - start?:string|null
      - end?:string|null
      - passCode?:string|null
      - questions?:{title:string;answers?:{description:string;isCorrect?:boolean|null|undefined}[]|null|undefined}[]|null
      Out come: { message: 'Test created! '}*/
testRouter.post('/createTest', createTest);

/*
      Use: Add one or more questions to the question
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      -questions: {title:string;answers?:{description:string;isCorrect?:boolean|null|undefined}[]|null|undefined}[]
      Out come:
      - OC1: if `answers` is not present in `params.questions[i]` or null or undefined: the question is added but it does not have any answers
      - OC2: if `answers` is present and not null and not undefined:
            + OC2.1: if `isCorrect` is present in `params.questions[i].answers[j]` and not null and not undefined: the answer will have correctness
            + OC2.2: if `isCorrect` is not present in `params.questions[i].answers[j]` or null or undefined: the answer will not have correctness, only its description
*/
testRouter.post('/addQuestion', addQuestion);

/*
      Use: Add one or more answers to the question
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - answers: {description:string,isCorrect?:boolean|null|undefined}[]
      Out come:
      -OC1: if `isCorrect` is present in `params.answers[i]` and not null and not undefined: the added answer will have both its description and correctness
      -OC2: if `isCorrect` is not present in `params.answers[i]` or null or undefined: the added answer will not have its correctness set
*/
testRouter.post('/addAnswer', addAnswer);

/*
      Use: Delete a test
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
*/
testRouter.post('/deleteTest', deleteTest);

/*
      Use: Delete a question
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
*/
testRouter.post('/deleteQuestion', deleteQuestion);

/*
      Use: Delete an answer of a question
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - answerId:string
*/
testRouter.post('/deleteAnswer', deleteAnswer);

/*
      Use: Get the list of all questions and theirs answers or a specific question and its answers
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - questionId?:string|null
      Out come:
      - OC1: if `questionId` is present in `params` and not null: get a specific question and its answers
      - OC2: if `questionId` is not present in `params` or not null: get the list of all questions and theirs answers
*/
testRouter.post('/getQuestion', getQuestion);

/*
      Use: Update the title of the question
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - title:string
*/
testRouter.post('/updateQuestion', updateQuestion);

/*
      Use: Update the answer of the question
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - answerId:string
      - description?:string|null
      - isCorrect?:boolean|null
      Out come:
      - OC1: if `description` is present in `params` and not null:
            +OC1.1: if `isCorrect` is present in `params` and not null: both the description and the correctness of the answer will be updated
            +OC1.2: if `isCorrect` is not present in `params` or null: only the description will be updated
      - OC2: if `description` is not present in `params` or null:
            +OC2.1: if `isCorrect` is present in `params` and not null: only the correctness will be updated
            +OC2.2: if `isCorrect` is not present in `params` or null: nothing happen
*/
testRouter.post('/updateAnswer', updateAnswer);

/*
      Use: Get the list of student and their scores of a test
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
*/
testRouter.post('/getStudentScore', getStudentScore);

/*
      Use: Add/update student answers of a test
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
      - studentId:string
      - choices:{questionId:string, answerId?:string|null|undefined}[]
      Out come:
      - OC1: if `answerId` is present in `params.choices[i]` and not null and not undefined: student choice record will be set to `answerId` value
      - OC2: else student choice record will be set to null
*/
testRouter.post('/studentSubmitAnswer', studentSubmitAnswer);

/*
      Use: Begin grading procedure of a test
      Accepted method: POST
      Properties: 
      - classId:string
      - testId:string
*/
testRouter.post('/testGrading', testGrading);

testRouter.post('/passCodeTest', passCodeTest);

testRouter.post('/getTestClass', getTestClass);
