import { useState,useEffect } from 'react';
import SidebarTeacher from '../../../component/Teacher/SidebarTeacher';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import HeaderTeacher from '../../../component/Header/HeaderTeacher';
import { useNavigate } from 'react-router-dom';

export const TeacherScoreDetail = () => {
    const [data,setData] = useState(null);
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const respond = await fetch('');
                const result = await respond.json();
                setData(result);
            }
            catch{
                console.error('Error fetching data: ', error);
                )
            }
            fetchData();
        };
    }, []);
    return (
        <div>

        </div>
    )
};