import axios from 'axios';

export const deleteTest = async (testId: any, classId: any) => {
  try {
    const params = {
      testId: testId,
      classId: classId,
    };
    const response = await axios.post('http://localhost:4001/test/deleteTest', { params: params });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateTest = async (id: any, title: any, period: any, passCode: string) => {
    try {
        const params = {
          id: id,
          title: title,
          period: period,
          passCode: passCode,
        };
        const response = await axios.post('http://localhost:4001/test/updateTest', { params: params });
        console.log('Phản hồi từ máy chủ:', response.data);
        
      } catch (error) {
        console.log(error);
      }
}