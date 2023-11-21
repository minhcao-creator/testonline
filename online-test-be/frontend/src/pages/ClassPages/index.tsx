import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import CreateClassBox from './CreateClassBox';
import ClassBox from './ClassBox';
export default function ClassPages() {
  const [classId, setClassId] = useState('CLASS1')
  return (
    <div className='class-pages'>
        <div>
          <ClassBox id = {classId}/>
        </div>
        <div>
          <CreateClassBox/>
        </div>
    </div>
  )
}
