import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AllTest from '../../../component/TeacherComponents/Dashboard/AllTest'
import DetailQuiz from '../../../component/TeacherComponents/Dashboard/DetailQuiz'
import CreateTestBox from '../../../component/TeacherComponents/Dashboard/CreateTestBox'
export const Dashboard = () => {
    return (
        <div className='d-flex justify-center'>
            <div className='w-100 p-2 overflow-x-hidden dashboard-container'>
                <div className='dashboard-title'>
                  <h4>CLASS 1</h4>
                </div>
                <div className='dashboard-top'>
                  <div className='dashboard-left'>
                    <DetailQuiz/>
                  </div>
                  <div className='dashboard-right'>
                    <CreateTestBox/>
                  </div>
                </div>
                <div className='dashboard-bottom'>
                  <AllTest/>
                </div>
            </div>
        </div>
    )
}