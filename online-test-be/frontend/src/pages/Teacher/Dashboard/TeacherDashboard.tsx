import { useState, useEffect } from 'react';
import SidebarTeacher from '../../../component/Teacher/SidebarTeacher';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import HeaderTeacher from '../../../component/Header/HeaderTeacher';
import { AiFillFileAdd, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useFetchData, usePagination } from '../../../hooks/teacher';
import { CreateModal, EditModal } from '../../../component/Teacher/Modal';
import { deleteTest } from '../../../services/teacher';

export type TestItem = {
  id: string;
  title: string;
  period: number;
  passCode: string;
};

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const params = { classId: 'CLASS1' };
  const { data, fetchData } = useFetchData('http://localhost:4001/test/getAllTest', params);

  const [search, setSearch] = useState('');
  const itemsPerPage = 5;
  const filterData = data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  const { currentPage, totalPages, currentData, handlePageChange } = usePagination(itemsPerPage, filterData);

  const [currentEditItem, setCurrentEditItem] = useState<TestItem | null>(null);

  //Show create
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  //Show edit
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => {
    setShowEdit(true);
  };

  //show modal edit
  const handleEditTest = (item: TestItem) => {
    setCurrentEditItem(item);
    handleShowEdit();
  };

  //handle deleteTest
  const handleDeleteTest = async (testId: string, classId: string) => {
    if (window.confirm('Are you sure to delete this test?')) {
      await deleteTest(testId, classId);
      fetchData();
    }
  };

  console.log(currentData);

  return (
    <div id="wrapper">
      <SidebarTeacher />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/*  */}
          <HeaderTeacher />
          <div className="d-flex justify-content-end mr-5 ">
            <Button variant="danger" className="font-weight-bold" onClick={handleShow}>
              + Create
            </Button>
          </div>
          {/* Danh sach */}
          <div className="pl-3 pr-3">
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
                  <th>Period</th>
                  <th>Passcode</th>
                  <th>Tools</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.period}</td>
                    <td>{item.passCode}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          const encodedItemId = btoa(item.id.toString());
                          navigate(`/teacher/dashboard/${encodedItemId}/questions`);
                        }}
                        style={{ paddingTop: '1px' }}
                      >
                        <AiFillFileAdd />
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ paddingTop: '1px' }}
                        onClick={() => handleDeleteTest(item.id, item.classId)}
                      >
                        <AiFillDelete />
                      </Button>{' '}
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleEditTest(item)}
                        style={{ paddingTop: '1px' }}
                      >
                        <AiFillEdit />
                      </Button>
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
      {show && <CreateModal show={show} setShow={setShow} fetchData={fetchData} />}
      {showEdit && (
        <EditModal
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          fetchData={fetchData}
          currentEditItem={currentEditItem}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
