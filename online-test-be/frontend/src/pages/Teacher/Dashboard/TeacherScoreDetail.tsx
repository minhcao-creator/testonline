import { useState } from 'react';
import SidebarTeacher from '../../../component/Teacher/SidebarTeacher';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import HeaderTeacher from '../../../component/Header/HeaderTeacher';
import { useNavigate } from 'react-router-dom';
export const TeacherScoreDetail = () => {
    const navigate= useNavigate();
    const [search, setSearch] = useState('');
    const [data, setData] = useState([
        { id: 1, name: 'Nguyen Van A', score: 10 },
        { id: 2, name: 'Nguyen Van B', score: 10 },
        { id: 3, name: 'Nguyen Van C', score: 10 },
        { id: 4, name: 'Nguyen Van D', score: 10 },
        { id: 5, name: 'Nguyen Van E', score: 10 },
        { id: 6, name: 'Nguyen Van F', score: 10 },
        { id: 7, name: 'Nguyen Van G', score: 10 },
        { id: 8, name: 'Nguyen Van H', score: 10 },
        { id: 9, name: 'Nguyen Van I', score: 10 },
        // ... Thêm dữ liệu mẫu khác
    ]);
    const filterData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    //Pagination
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filterData.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filterData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div id='wrapper'>
            <SidebarTeacher />
            {/* Content */}
            <div id='content-wrapper' className='d-flex flex-column'>
                <HeaderTeacher />
                <div className="d-flex justify-content-start mr-5 ml-3 mb-2 ">
                    <Button variant="success" className="font-weight-bold" onClick={() => navigate('/teacher/score')}>
                        Back
                    </Button>
                   
                </div>
                <div className='pl-3 pr-3'>
                    <h2>List of test</h2>
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            style={{
                                width: '250px',
                                marginBottom: '15px',

                            }}
                            placeholder="Search title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Name</th>
                                <th>Score</th>
                                {/* <th>Tools</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>

                                    {/* <td>
                                        <Button variant='success' size='sm' style={{ paddingTop: '1px' }}>
                                            <IoEyeSharp />
                         
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
