import { useState } from 'react';
import SidebarTeacher from '../../../component/Teacher/SidebarTeacher';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import {IoEyeSharp} from 'react-icons/io5';
import HeaderTeacher from '../../../component/Header/HeaderTeacher';
import { useNavigate } from 'react-router-dom';
export const TeacherScore = () => {
  const navigate= useNavigate();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([
    { id: 1, title: 'Mẫu số 1', numQuestions: 10, passCode: 'ABC123' },
    { id: 2, title: 'Mẫu số 2', numQuestions: 5, passCode: 'XYZ789' },
    { id: 3, title: 'Mẫu số 1', numQuestions: 10, passCode: 'ABC123' },
    { id: 4, title: 'Mẫu số 2', numQuestions: 5, passCode: 'XYZ789' },
    { id: 5, title: 'Mẫu số 1', numQuestions: 10, passCode: 'ABC123' },
    { id: 6, title: 'Mẫu số 2', numQuestions: 5, passCode: 'XYZ789' },
    { id: 7, title: 'Mẫu số 1', numQuestions: 10, passCode: 'ABC123' },
    { id: 8, title: 'Mẫu số 2', numQuestions: 5, passCode: 'XYZ789' },
    // ... Thêm dữ liệu mẫu khác
  ]);
  const filterData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
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
                <th>Title</th>
                <th>Number of questions</th>
                <th>Passcode</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.numQuestions}</td>
                  <td>{item.passCode}</td>
                  <td>
                    <Button variant='success' size='sm' style={{ paddingTop: '1px' }} onClick={()=>{navigate('/teacher/score/detail')}}>
                      <IoEyeSharp />
                    </Button> {' '}
                    {/* <Button variant="danger" size="sm" style={{ paddingTop: '1px' }} >
                      <AiFillDelete />
                    </Button>{' '}
                    <Button variant="info" size="sm" onClick={() => handleEditTest(item)} style={{ paddingTop: '1px' }}>
                      <AiFillEdit />
                    </Button> */}
                  </td>
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
