import { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import { redirect } from 'react-router-dom';
import axios from 'axios';

export default function Exam() {
    const [formData, setFormData] = useState([])
    const [exam, setExam] = useState([])
    function handlerInput(id_question: string, answer: string) {
        setFormData({ ...formData, [id_question]: answer })
    }
    console.log(formData);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return redirect("/result");
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    useEffect(() => {
        const getExam = async () => {
            try {
                const response = await axios.post('http://localhost:4001/test/getQuestion', {
                    params: {
                        "classId": "CLASS1",
                        "testId": "TEST1"
                    }
                });
                setExam(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getExam();
    }, []);
    let listQuestion = []
    let listAnswer = []
    if (exam.data) {
        exam.data.map((question, index) => {
            listAnswer.push(question)
            if (index % 4 == 3) {
                listQuestion.push(listAnswer)
                listAnswer = []
            }
        })

    }

    return (
        <div>
            <div className='p-2 mt-2 text-center' style={{ "background": "linear-gradient(#fff,#f2f5f9)" }}>
                <p className='text-[#2e66ad] text-2xl font-normal text-center'>Đề thi 1</p>
            </div>
            <div className='flex flex-row relative'>
                <div className='py-2 mt-2 px-10 w-[70%]'>
                    {
                        listQuestion.map((question, index) => {
                            return (
                                <div key={index} className='border-b border-[rgb(51,51,51)] py-2'>
                                    <p className='text-lg  mb-[-10px] font-medium'><span className='font-medium'>Câu {index + 1}: </span>{question[index].title}?</p>
                                    <div>
                                        <ul className="mt-2 text-base text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white" onChange={(e) => {
                                            handlerInput(question[0].questionId, e.target.id)
                                        }}>
                                            <li className="w-full rounded-t-lg flex flex-row items-center ">
                                                <div className="flex items-center pl-3">
                                                    <input id={question[0].answerId}
                                                        type="radio" value="" name={`list-radio${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="list-radio-license" className="w-full mt-1 py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">A. </label>
                                                </div>
                                                <p className='mt-[12px]'>{question[0].description}</p>
                                            </li>
                                            <li className="w-full rounded-t-lg flex flex-row items-center ">
                                                <div className="flex items-center pl-3">
                                                    <input id={question[1].answerId}
                                                        type="radio" value="" name={`list-radio${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="list-radio-license" className="w-full mt-1 py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">B. </label>
                                                </div>
                                                <p className='mt-[12px]'>{question[1].description}</p>
                                            </li>
                                            <li className="w-full rounded-t-lg flex flex-row items-center ">
                                                <div className="flex items-center pl-3">
                                                    <input id={question[2].answerId}
                                                        type="radio" value="" name={`list-radio${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="list-radio-license" className="w-full mt-1 py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">C. </label>
                                                </div>
                                                <p className='mt-[12px]'>{question[2].description}</p>
                                            </li>
                                            <li className="w-full rounded-t-lg flex flex-row items-center ">
                                                <div className="flex items-center pl-3">
                                                    <input id={question[3].answerId}
                                                        type="radio" value="" name={`list-radio${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="list-radio-license" className="w-full mt-1 py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">D. </label>
                                                </div>
                                                <p className='mt-[12px]'>{question[3].description}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='flex-1 mt-4 mr-14'>
                    <div className='text-xl bg-[#f96935] rounded-xl p-2 flex flex-col justify-center items-center'>
                        <div>
                            <div className='w-full'>
                                <span className='text-[#464646] font-medium'>Thời gian còn lại</span>
                                <span className='mx-2'>|</span>
                                <span className='text-white'>
                                    <Countdown
                                        date={Date.now() + 3600000}
                                        renderer={renderer}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <p className='text-[#2e66ad] rounded-md text-center font-medium text-xl p-2 bg-[#e2e2e2]'>Câu hỏi</p>
                        <div className='bg-[#fafafa] p-2 pt-3 grid grid-cols-6 justify-items-center gap-y-3'>
                            {
                                listQuestion.map((question, index) => {
                                    return (
                                        <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                            {index + 1}
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className='text-center mt-5'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Nộp bài
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}




