drop function if exists isCorrect;
delimiter //
create function isCorrect(classId varchar(10),testId varchar(10),questionId varchar(10),studentId varchar(10)) returns boolean
begin
	declare expectedAnswer varchar(10) default null;
    declare actualAnswer varchar(10) default null;
    select id into expectedAnswer from Answer where isCorrect=true and Answer.questionId=questionId and Answer.testId=testId and Answer.classId=classId;
    select answerChoice into actualAnswer from StudentChoice where StudentChoice.classId=classId and StudentChoice.testId=testId and StudentChoice.questionId=questionId and StudentChoice.studentId=studentId;
    if expectedAnswer=actualAnswer then
		return true;
	else
		return false;
	end if;
end;
delimiter ;