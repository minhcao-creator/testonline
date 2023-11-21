-- drop schema if exists OnlineTest;
-- create schema OnlineTest;
-- use OnlineTest;
CREATE TABLE
      Teacher (
            name varchar(255) not null,
            id varchar(10) primary key,
            username varchar(20) unique not null,
            password varchar(20) not null
      ) ENGINE = InnoDB;

insert into Teacher values('TEACHER_NAME','TEACHER1','teacher1','teacher123');

CREATE TABLE
      Class (
            id varchar(10) primary key,
            name varchar(255) not null,
            teacherId varchar(10) not null,
            foreign key (teacherId) references Teacher (id)
      ) ENGINE = InnoDB;
      
insert into Class values('CLASS1','CLASS_NAME','TEACHER1');

-- select * from Test;
-- select * from Question;
-- select * from Answer;

CREATE TABLE
      Test (
            id VARCHAR(10),
            title VARCHAR(100) NOT NULL,
            period INT,
            startTime DATETIME,
            endTime DATETIME,
            passCode VARCHAR(20),
            classId VARCHAR(10),
            PRIMARY KEY (id, classId),
            FOREIGN KEY (classId) REFERENCES Class (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Question (
            id VARCHAR(10),
            testId VARCHAR(10),
            classId VARCHAR(10),
            title TEXT NOT NULL,
            PRIMARY KEY (id, testId, classId),
            FOREIGN KEY (testId, classId) REFERENCES Test (id, classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Answer (
            id VARCHAR(10),
            description TEXT NOT NULL,
            isCorrect BOOLEAN,
            questionId VARCHAR(10),
            testId VARCHAR(10),
            classId VARCHAR(10),
            PRIMARY KEY (id, questionId, testId, classId),
            FOREIGN KEY (questionId, testId, classId) REFERENCES Question (id, testId, classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Student (
            id VARCHAR(10) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL
      ) ENGINE = InnoDB;

CREATE TABLE
      InClass (
            studentId VARCHAR(10),
            classId VARCHAR(10),
            PRIMARY KEY (studentId, classId),
            FOREIGN KEY (studentId) REFERENCES Student (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (classId) REFERENCES Class (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      StudentChoice (
            studentId VARCHAR(10),
            questionId VARCHAR(10),
            testId VARCHAR(10),
            classId VARCHAR(10),
            answerChoice VARCHAR(10),
            PRIMARY KEY (studentId, questionId, testId, classId, answerChoice),
            FOREIGN KEY (studentId) REFERENCES Student (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (answerChoice,questionId, testId, classId) REFERENCES Answer (id,questionId, testId, classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      StudentTest (
            studentId VARCHAR(10),
            testId VARCHAR(10),
            classId VARCHAR(10),
            dateOfSubmit datetime NOT NULL,
            score DOUBLE NOT NULL default 0.0,
            PRIMARY KEY (studentId, testId, classId),
            FOREIGN KEY (studentId) REFERENCES Student (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (testId, classId) REFERENCES Test (id, classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;