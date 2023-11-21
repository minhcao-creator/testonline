import { useState, useEffect } from 'react';
import SidebarTeacher from '../../../component/Teacher/SidebarTeacher';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import HeaderTeacher from '../../../component/Header/HeaderTeacher';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export const Questions = () => {
  const { id } = useParams();
  const testId = atob(id);
  //Select
  const [option1, setOption1] = useState('A.');
  const [option2, setOption2] = useState('B.');
  const [option3, setOption3] = useState('C.');
  const [option4, setOption4] = useState('D.');
  const [selectedOption, setSelectedOption] = useState('');
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [data, setData] = useState([]);
  //get Question
  const getAllQuestion = async () => {
    try {
      const params = {
        classId: 'CLASS1',
        testId: testId,
      };
      const res = await axios.post('http://localhost:4001/test/getAllQuestion', { params: params });
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getQuestionInfomation = async (questionId) => {
    try {
      const params = {
        classId: 'CLASS1',
        testId: testId,
        questionId: questionId,
      };
      const res = await axios.post('http://localhost:4001/test/getQuestion', { params: params });
      if (res.status == 200) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllQuestion();
  }, []);

  const navigate = useNavigate();
  const [idQuestion, setIdQuestion] = useState(-1);
  //errors validate;
  const [errors, setErrors] = useState('');
  //state search
  const [search, setSearch] = useState('');
  //handle modal create question
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => {
    setTitle('');
    setOption1('A.');
    setOption2('B.');
    setOption3('C.');
    setOption4('D.');
    setErrors('');
    setSelectedOption('');
    setShowCreate(false);
  };
  const handleShowCreate = () => {
    setShowCreate(true);
  };
  //handle modal edit question
  const [showEdit, setShowEdit] = useState(false);
  //reset all input
  const handleCloseEdit = () => {
    setTitle('');
    setOption1('A.');
    setOption2('B.');
    setOption3('C.');
    setOption4('D.');
    setErrors('');
    setSelectedOption('');
    setShowEdit(false);
  };
  const handleShowEdit = () => {
    setErrors('');
    setShowEdit(true);
  };
  //state input create question
  const [title, setTitle] = useState('');

  //handle search

  const filterData = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  //handle create question
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrors('vui lòng nhập tiêu đề');
      return;
    }
    if (selectedOption.trim() === '') {
      setErrors('Vui lòng chọn đáp án');
      return;
    }
    if (option1.trim() === '' || option2.trim() === '' || option3.trim() === '' || option4.trim() === '') {
      setErrors('Vui lòng nhập lựa chọn');
      return;
    }
    if (option1.trim() === 'A.' || option2.trim() === 'B.' || option3.trim() === 'C.' || option4.trim() === 'D.') {
      setErrors('Vui lòng nhập lựa chọn');
      return;
    }
    try {
      const params = {
        classId: 'CLASS1',
        testId: testId,
        questions: [
          {
            title: title,
            answers: [
              {
                description: option1,
                isCorrect: selectedOption === 'a',
              },
              {
                description: option2,
                isCorrect: selectedOption === 'b',
              },
              {
                description: option3,
                isCorrect: selectedOption === 'c',
              },
              {
                description: option4,
                isCorrect: selectedOption === 'd',
              },
            ],
          },
        ],
      };
      console.log(params);

      const res = await axios.post('http://localhost:4001/test/addQuestion', { params: params });
      if (res.status == 200) {
        setTitle('');
        setOption1('A.');
        setOption2('B.');
        setOption3('C.');
        setOption4('D.');
        setErrors('');
        setSelectedOption('');
        getAllQuestion();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    // setData([...data, {
    //   idQuestion: data.length + 1,
    //   title: title,
    //   contentQuestion: contentQuestion,
    //   result: result
    // }])

    // setTitle('');
    // setContentQuestion('');
    // setResult('');
  };
  // Show modal with item data
  const [id1, setId1] = useState();
  const [id2, setId2] = useState();
  const [id3, setId3] = useState();
  const [id4, setId4] = useState();
  const handleEditQuestion = async (idQuestion) => {
    console.log(idQuestion);
    const data = await getQuestionInfomation(idQuestion);

    setIdQuestion(idQuestion);
    console.log(data);
    data.map((item, index) => {
      if (index == 0) {
        setTitle(item.title);
        setId1(item.id);
        setOption1(item.description);
      }
      if (index == 1) {
        setId2(item.id);
        setOption2(item.description);
      }
      if (index == 2) {
        setId3(item.id);
        setOption3(item.description);
      }
      if (index == 3) {
        setId4(item.id);
        setOption4(item.description);
      }
      if (item.isCorrect && index == 0) setSelectedOption('a');
      if (item.isCorrect && index == 1) setSelectedOption('b');
      if (item.isCorrect && index == 2) setSelectedOption('c');
      if (item.isCorrect && index == 3) setSelectedOption('d');
    });
    handleShowEdit();
  };
  //handle when submit edit question
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrors('vui lòng nhập tiêu đề');
      return;
    }
    if (selectedOption.trim() === '') {
      setErrors('Vui lòng chọn đáp án');
      return;
    }
    if (option1.trim() === '' || option2.trim() === '' || option3.trim() === '' || option4.trim() === '') {
      setErrors('Vui lòng nhập lựa chọn');
      return;
    }
    if (option1.trim() === 'A.' || option2.trim() === 'B.' || option3.trim() === 'C.' || option4.trim() === 'D.') {
      setErrors('Vui lòng nhập lựa chọn');
      return;
    }
    try {
      await axios.post('http://localhost:4001/test/updateQuestion', {
        params: {
          classId: 'CLASS1',
          testId: testId,
          questionId: idQuestion,
          title: title,
        },
      });
      console.log(selectedOption);
      await axios.post('http://localhost:4001/test/updateAnswer', {
        params: {
          classId: 'CLASS1',
          testId: testId,
          questionId: idQuestion,
          answerId: id2,
          description: option2,
          isCorrect: selectedOption === 'b' ? true : false,
        },
      });
      await axios.post('http://localhost:4001/test/updateAnswer', {
        params: {
          classId: 'CLASS1',
          testId: testId,
          questionId: idQuestion,
          answerId: id3,
          description: option3,
          isCorrect: selectedOption === 'c' ? true : false,
        },
      });

      await axios.post('http://localhost:4001/test/updateAnswer', {
        params: {
          classId: 'CLASS1',
          testId: testId,
          questionId: idQuestion,
          answerId: id4,
          description: option4,
          isCorrect: selectedOption === 'd' ? true : false,
        },
      });

      await axios.post('http://localhost:4001/test/updateAnswer', {
        params: {
          classId: 'CLASS1',
          testId: testId,
          questionId: idQuestion,
          answerId: id1,
          description: option1,
          isCorrect: selectedOption === 'a' ? true : false,
        },
      });
      getAllQuestion();
      handleCloseEdit();
      // const params = {
      //   classId: 'CLASS1',
      //   testId: testId,
      //   questions: [{
      //     title: title,
      //     answers: [
      //       {
      //         description: option1,
      //         isCorrect: selectedOption === 'a'
      //       },
      //       {
      //         description: option2,
      //         isCorrect: selectedOption === 'b'
      //       },
      //       {
      //         description: option3,
      //         isCorrect: selectedOption === 'c'
      //       },
      //       {
      //         description: option4,
      //         isCorrect: selectedOption === 'd'
      //       },
      //     ]
      //   }]
      // }
    } catch (error) {
      console.log(error);
    }
  };
  //handle delete question
  const handleDeleteQuestion = (idQuestion) => {
    console.log(idQuestion);
  };
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
    <div id="wrapper">
      <SidebarTeacher />
      {/* Content */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Header Teacher */}
        <HeaderTeacher />
        <div className="d-flex justify-content-between mr-5 ml-3 mb-2 ">
          <Button variant="success" className="font-weight-bold" onClick={() => navigate('/teacher/dashboard')}>
            Back
          </Button>
          <Button variant="danger" className="font-weight-bold" onClick={handleShowCreate}>
            + Create
          </Button>
        </div>
        <div className="pl-3 pr-3">
          <h2>List of questions</h2>
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
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>{item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}</td>

                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteQuestion(item.idQuestion)}
                        style={{ paddingTop: '1px' }}
                      >
                        <AiFillDelete />
                      </Button>{' '}
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleEditQuestion(item.id)}
                        style={{ paddingTop: '1px' }}
                      >
                        <AiFillEdit />
                      </Button>
                    </td>
                  </tr>
                );
              })}
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
      {/* Modal create */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create Question</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitCreate}>
          <Modal.Body>
            <Form.Group controlId="formContentQuestion">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write in here..."
              />
            </Form.Group>
            <Form.Group controlId="formOption1">
              <Form.Label>Option 1:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option1"
                  name="radioOption"
                  value={'a'}
                  checked={selectedOption == 'a'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />

                <Form.Control
                  type="text"
                  placeholder="Enter option 1"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formOption2">
              <Form.Label>Option 2:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option2"
                  name="radioOption"
                  value={'b'}
                  checked={selectedOption == 'b'}
                  // checked={selectedOption === 'option1'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 2"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formOption3">
              <Form.Label>Option 1:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option3"
                  name="radioOption"
                  value={'c'}
                  checked={selectedOption == 'c'}
                  // checked={selectedOption === 'option1'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 3"
                  value={option3}
                  checked={selectedOption == option4}
                  onChange={(e) => setOption3(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formOption4">
              <Form.Label>Option 4:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option4"
                  name="radioOption"
                  value={'d'}
                  checked={selectedOption === 'd'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 4"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Modal.Body>
          <div className="ml-3 text-danger">{errors}</div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitCreate}>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal edit */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Form.Group controlId="formContentQuestion">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write in here..."
              />
            </Form.Group>
            <Form.Group controlId="formOption1">
              <Form.Label>Option 1:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option1"
                  name="radioOption"
                  value={'a'}
                  checked={selectedOption === 'a'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />

                <Form.Control
                  type="text"
                  placeholder="Enter option 1"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formOption2">
              <Form.Label>Option 2:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option2"
                  name="radioOption"
                  value={'b'}
                  checked={selectedOption === 'b'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 2"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formOption3">
              <Form.Label>Option 1:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option3"
                  name="radioOption"
                  value={'c'}
                  checked={selectedOption === 'c'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 3"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formOption4">
              <Form.Label>Option 4:</Form.Label>
              <div className="d-flex justify-content-between ml-4">
                <Form.Check
                  type="radio"
                  id="option4"
                  name="radioOption"
                  value={'d'}
                  checked={selectedOption === 'd'}
                  onChange={handleRadioChange}
                  style={{
                    marginTop: '3px',
                    marginRight: '5px',
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 4"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                ></Form.Control>
              </div>
            </Form.Group>
          </Modal.Body>
          <div className="ml-3 text-danger">{errors}</div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitEdit}>
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
