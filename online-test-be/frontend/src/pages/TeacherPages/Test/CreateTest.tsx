import React, { useState, useEffect } from 'react'
import './styleTest.css';
import { HeaderCreateTest } from '../../../component/TeacherComponents/HeaderCreateTest/HeaderCreateTest';
import { ContentCreateTest } from '../../../component/TeacherComponents/ContentCreateTest/ContentCreateTest';
import { ContentConfigureTest } from '../../../component/TeacherComponents/ContentConfigureTest';
import { useParams } from 'react-router-dom';
import { initialCreatTest } from '../../../data/data';
export const CreateTest = () => {
  const { classId } = useParams();
  const parseState = localStorage.getItem('stateTest') === null ? JSON.stringify({
    ...initialCreatTest,
    classId: classId
  }) : localStorage.getItem('stateTest');
  const initialState = JSON.parse(parseState);

  const [errorConfigure, setErrorConfigure] = useState('');
  const [page, setPage] = useState(1);
  const [createTest, setCreateTest] = useState(initialState);
  // Lay gia tri tu localStorage
  useEffect(() => {
    localStorage.setItem('stateTest', JSON.stringify(createTest))
  }, [createTest])
  return (
    <>
      <HeaderCreateTest page={page}
        setPage={setPage}
        createTest={createTest} setCreateTest={setCreateTest}
        errorConfigure={errorConfigure} setErrorConfigure={setErrorConfigure}
      />
      {page == 1 && <ContentCreateTest page={page} setPage={setPage}
        createTest={createTest} setCreateTest={setCreateTest}

      />}
      {page == 2 && <ContentConfigureTest page={page} setPage={setPage}
        createTest={createTest} setCreateTest={setCreateTest}
        errorConfigure={errorConfigure}
      />}
    </>
  )
}
