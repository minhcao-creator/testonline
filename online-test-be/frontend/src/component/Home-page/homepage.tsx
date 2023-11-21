import HeaderTeach from '../Header/HeaderTeacher';
import Header from '../Header/header';
import axios from 'axios';
import { useState, useEffect, memo } from 'react';
import { Logger } from 'sass';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Exam from '../../pages/Student/Exam/Exam';
import { Modal } from 'react-bootstrap';

const CustomModal = memo(function CustomModal({ test, isAllow, setAllow }: any) {
  const navigate = useNavigate();

  const [passCode, setPassCode] = useState('');
  const [showPassCode, setShowPassCode] = useState(false);

  const toggleShowPassCode = () => {
    setShowPassCode(!showPassCode);
  };

  const handlePassCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassCode(e.target.value);
  };

  const handleSubmitPassCode = async (classId: string, testId: string) => {
    try {
      const response = await axios.post('http://localhost:4001/test/passCodeTest', {
        params: {
          classId: classId,
          testId: testId,
          passCode: passCode,
        },
      });

      if (response.status === 200) {
        // alert('Pass code đúng, vào làm bài');
        setAllow(false);
        navigate('/exam');
      }
    } catch (error) {
      if (error?.response?.status === 401) alert('Pass code sai');
    }
  };
  return (
    <Modal show={isAllow} onHide={() => setAllow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Enter test password {test?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitPassCode('CLASS1', test?.id); // Replace 'CLASS1' with the appropriate classId
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              PassCode
            </label>
            <div className="input-group">
              <input
                onChange={handlePassCodeChange}
                type={showPassCode ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
              />
              <span className="input-group-text">
                <i
                  className={showPassCode ? 'fas fa-eye-slash' : 'fas fa-eye'}
                  onClick={() => setShowPassCode(!showPassCode)}
                  style={{ cursor: 'pointer' }}
                />
              </span>
            </div>
          </div>

          <button className="btn btn-primary">Xác nhận</button>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
});
function HomePage() {
  const location = useLocation();
  const user = location.state && location.state.user;

  const [isAllow, setAllow] = useState(false);

  const [currentTest, setCurrentTest] = useState<any>(null);

  // console.log(user);

  const [testClass, setTestClass] = useState([]);

  useEffect(() => {
    const getTestClass = async () => {
      try {
        const response = await axios.post('http://localhost:4001/test/getTestClass', {
          params: {
            classId: 'CLASS1',
          },
        });
        setTestClass(response.data.testClass);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getTestClass();
  }, []);

  console.log('test class ', testClass);

  return (
    <div className="">
      <Header />
      {testClass.length > 0 && (
        <>
          <div className="container py-4 px-3 mx-auto">
            <div className="container text-left mt-2">
              <div className="row gap-3">
                {testClass.map((test, index) => (
                  <>
                    <div key={test?.id} className="col">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{test?.title}</h5>
                          <div className="card-text mb-2">
                            <span className=""> Thời gian: {test?.period ? test.period : 'Không giới hạn'}</span>
                            <span className="mx-2">|</span>
                            <span className="">Số câu: {test?.questions?.length || 1}</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target={`#exampleModal${index}`}
                            onClick={() => {
                              setAllow(true);
                              setCurrentTest(test);
                            }}
                          >
                            Làm bài
                          </button>
                        </div>
                      </div>
                    </div>

                    {index % 2 === 1 && <div class="w-100"></div>}
                    {index % 2 === 0 && index === testClass.length - 1 && <div key={test?.id} className="col"></div>}
                  </>
                ))}
                <CustomModal test={currentTest} isAllow={isAllow} setAllow={setAllow} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
