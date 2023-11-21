import React from 'react'

function DetailQuiz() {
  return (
    <div className='detail-quiz'>
        <div className='title-quiz'>
            <h5>Quiz 1</h5>
            <div>
                <button className='btn-update'>Update</button>
                <button className='btn-delete'>Delete</button>
            </div>
        </div>
        <div className='info-quiz'>
            <div className='info-1'>
                <div className='info-1-1'>
                    <div className='start-time'>
                        Start
                    </div>
                    <div className='end-time'>
                        End
                    </div>
                    <div className='priot'>
                        Periot
                    </div>
                    <div className='passcode'>
                        Pass code
                    </div> 
                </div>
                <div>
                    <div className='start-time'>
                        Start
                    </div>
                    <div className='end-time'>
                        End
                    </div>
                    <div className='priot'>
                        Periot
                    </div>
                    <div className='passcode'>
                        Pass code
                    </div>  
                </div>
                
            </div>
            
            <div className='info-2'>
                <button className='btn-question'>List questions</button>
            </div>
        </div>
    </div>
  )
}

export default DetailQuiz