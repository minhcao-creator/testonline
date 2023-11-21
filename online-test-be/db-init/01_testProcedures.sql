use OnlineTest;

DROP PROCEDURE IF EXISTS addTest;
DELIMITER //
CREATE PROCEDURE addTest(
	IN title TEXT,
	IN period INT,
	IN startTime DATETIME,
	IN endTime DATETIME,
	IN passCode VARCHAR(20),
	IN classId VARCHAR(10)
)
BEGIN
	DECLARE counter INT DEFAULT 0;
	SELECT CAST(LEFT(id,4) AS UNSIGNED) INTO counter FROM Test WHERE Test.classId=classId ORDER BY id DESC LIMIT 1;
	SET counter=1+counter;
	INSERT INTO Test VALUES(CONCAT('TEST',counter),title, period, startTime, endTime, passCode, classId);
END//
DELIMITER ;

drop procedure if exists addQuestion;
delimiter //
create procedure addQuestion(
	in testId varchar(10),
    in classId varchar(10),
    in title text
)
begin
	declare counter int default 0;
    select left(id,8) into counter from Question where Question.classId=classId and Question.testId=testId order by id desc limit 1;
    set counter:=1+ counter;
    insert into Question values(concat('QUESTION',counter),testId,classId,title);
end//
delimiter ;

drop procedure if exists addAnswer;
delimiter //
create procedure addAnswer(
	in description text,
    in isCorrect boolean,
    in questionId varchar(10),
	in testId varchar(10),
    in classId varchar(10)
)
begin
	declare counter int default 0;
    select left(id,6) into counter from Answer where Answer.questionId=questionId and Answer.testId=testId and Answer.classId=classId;
    set counter:=1+counter;
    insert into Answer values(concat('ANSWER',counter),description,isCorrect,questionId, testId, classId);
end//
delimiter ;

drop procedure if exists submitAnswer;
delimiter //
create procedure submitAnswer(
    in classId varchar(10),
    in testId varchar(10),
    in studentId varchar(10),
    in questionId varchar(10),
    in answerId varchar(10)
)
begin
    declare isFound boolean default false;
    select answerChoice into isFound from StudentChoice where StudentChoice.classId=classId and StudentChoice.testId=testId and StudentChoice.questionId=questionId and StudentChoice.studentId=studentId;
    if isFound then
        update StudentChoice set answerChoice=answerId where StudentChoice.classId=classId and StudentChoice.testId=testId and StudentChoice.questionId=questionId and StudentChoice.studentId=studentId;
    else
        insert into StudentChoice values(studentId,questionId,testId,classId,answerId);
    end if;
    
    set isFound:=null;
    select StudentTest.studentId into isFound from StudentTest where StudentTest.classId=classId and StudentTest.testId=testId and StudentTest.studentId=studentId;
    
    if isFound then
		update StudentTest set dateOfSubmit=now() where StudentTest.classId=classId and StudentTest.testId=testId and StudentTest.studentId=studentId;
    else
		insert into StudentTest values(studentId,testId,classId,NOW(),0.0);
    end if;
end//
delimiter ;

drop procedure if exists gradingTest;
delimiter //
create procedure gradingTest(
    in classId varchar(10),
    in testId varchar(10)
)
begin
	declare studentIdIter varchar(10);
    declare totalQuestions int default 0;
    declare result double default 0.0;

	DECLARE doneLoop1 INT DEFAULT FALSE;
	declare studentIdReader cursor for select unqiue studentId from StudentChoice where StudentChoice.classId=classId and StudentChoice.testId=testId;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET doneLoop1 = TRUE;
    
    select count(*) into totalQuestions from Question where Question.classId=classId and Question.testId=testId;
    
    open studentIdReader;
    loop1: loop
    fetch studentIdReader into studentIdIter;
    if doneLoop1 then
		leave loop1;
    end if;
    
    set result:=0.0;
    
    block1: begin
    
    declare questionIdIter varchar(10);
    declare isCorrect boolean default null;
    
    DECLARE doneLoop2 INT DEFAULT FALSE;
	declare questionIdReader cursor for select unqiue id from Question where Question.classId=classId and Question.testId=testId;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET doneLoop2 = TRUE;
    
    open questionIdReader;
    loop2:loop
    fetch questionIdReader into questionIdIter;
    if doneLoop2 then
		leave loop2;
    end if;

    set isCorrect:=null;
    select isCorrect(classId,testId,questionIdIter,studentIdIter) into isCorrect;
    
    if isCorrect then
		set result:=result+1/totalQuestions;
    end if;
    
    end loop;
    close questionIdReader;
    
    end block1;
    
    update StudentTest set score=result where StudentTest.classId=classId and StudentTest.testId=testId and StudentTest.studentId=studentIdIter;
    
    end loop;
    close studentIdReader;
end//
delimiter ;