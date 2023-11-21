import menu_icons from './menu icons.svg';
import test_icons from './test_icon.svg';
import result_icons from './results_icon.svg';
import create_icons from './create_icon.svg';
import logout_icons from './logout_icons.svg';
export const TeacherLogout = {
    icon: <img src={logout_icons} alt='Menu Icon' />,
    name: 'Log out',
}
// Gia tri mac dinh cua creat test
export const initialCreatTest= {
    classId: '',
    index: 1,
    title: '',
    period: '',
    start: '',
    end: '',
    questions: []
  }
export const TeacherLink = [
    {
        key: 1,
        icon: <img src={menu_icons} alt='Menu Icon' />,
        name: 'Dashboard',
        to: './dashboard'
    },
    {
        key: 3,
        icon: <img src={result_icons} alt='Menu Icon' />,
        name: 'Results',
        to: '/class/'
    },
    {
        key: 4,
        icon: <img src={create_icons} alt='Menu Icon' />,
        name: 'Create New',
        to: './createTest'
    },

]
export function checkNoTitleOption(option1: any, option2: any, option3: any, option4: any) {
    if (option1.description.length === 0 ||
        option2.description.length === 0 ||
        option3.description.length === 0 ||
        option4.description.length === 0
    ) return true;
    return false;
}
export function checkNoCorrectOption(option1: any, option2: any, option3: any, option4: any) {
    if (!option1.isCorrect && !option2.isCorrect && !option3.isCorrect && !option4.isCorrect) {
        return true;
    }
    return false;
}
export function validateConfigure(creatTest:any, setErrorConfigure: (e:any)=>void ){
    if (creatTest.title.trim()===''){
        setErrorConfigure('Test name not empty')
        return false;
    }
    if (creatTest.period.trim()===''){
        setErrorConfigure('Test duration not empty')
        return false;
    }
    if (Number(creatTest.period)<=0){
        setErrorConfigure('Test duration greater than 0')
        return false;
    }
    if (creatTest.start.trim()===''){
        setErrorConfigure('Test start not empty')
        return false;
    }
    if (creatTest.end.trim()===''){
        setErrorConfigure('Test end not empty')
        return false;
    }
    if (creatTest.passCode.trim()===''){
        setErrorConfigure('Passcode not empty')
        return false;
    }
    return true;
}
export function validateQuestion(title: string, option1: any, option2: any, option3: any, option4: any, setError: (error: string) => void) {
    if (title.length === 0) {
        setError('Question without content')
        return true;
    }
    if (checkNoTitleOption(option1, option2, option3, option4)) {
        setError('Option without content')
        return true;
    }
    if (checkNoCorrectOption(option1, option2, option3, option4)) {
        setError('Options have at least 1 correct');
        return true;
    }
}
export function setQuestion(
    setTitle: (error: string) => void,
    setOption1: (error: any) => void,
    setOption2: (error: any) => void,
    setOption3: (error: any) => void,
    setOption4: (error: any) => void,
    setError: (error: string) => void,
    initialOption: any) 
    {
    setOption1(initialOption);
    setOption2(initialOption);
    setOption3(initialOption);
    setOption4(initialOption);
    setTitle('');
    setError('');
}
export function setConfigure(type:string,oldValue:any, value:string, setValue: (e:any)=>void){
    if (type==='title')
    setValue({
        ...oldValue,
        title: value,
    })
    if (type==='period')
    setValue({
        ...oldValue,
        period: value,
    })
    if (type==='start')
    setValue({
        ...oldValue,
        start: value,
    })
    if (type==='end')
    setValue({
        ...oldValue,
        end: value,
    })
    if (type==='passCode')
    setValue({
        ...oldValue,
        passCode: value,
    })
}