import { useState } from 'react';
import Login from './component/Login/login';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './scss/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './component/Home-page/homepage';
import { Dashboard } from './pages/TeacherPages/Test/Dashboard';
import Exam from './pages/Student/Exam/Exam';
import TeacherDashboard from './pages/Teacher/Dashboard/TeacherDashboard';
import { Questions } from './pages/Teacher/Dashboard/Questions';
import { TeacherScore } from './pages/Teacher/Dashboard/TeacherScore';
import { TeacherScoreDetail } from './pages/Teacher/Dashboard/TeacherScoreDetail';
import { CreateTest } from './pages/TeacherPages/Test/CreateTest';
import ClassPages from './pages/ClassPages';
import TeacherPages from './pages/TeacherPages';
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<Login />}></Route>
        {/* <Route path="/exam" element={<Exam />} /> */}
        <Route path='/teacher' element={<ClassPages />} />
        <Route path='/teacher/:classId/*' element={<TeacherPages />} />
         {/* <Route path="/studentdashboard" element={<Dashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/dashboard/:id/questions" element={<Questions />} />{' '}
        <Route path="/teacher/score" element={<TeacherScore />} />
        <Route path="/teacher/score/detail" element={<TeacherScoreDetail />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
