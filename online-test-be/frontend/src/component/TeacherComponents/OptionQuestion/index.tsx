import React, { useState } from 'react'
import './optionQuestion.css'
export const OptionQuestion = (props: any) => {
    const valueChange = (e: any) => {
        props.setOption({ ...props.option, isCorrect: !props.option.isCorrect })
        if (e) {
            props.setOption({ ...props.option, description: e.target.value })
        }
    }

    return (
        <div className='d-flex flex-column mb-2'>
            <input className='inputOption' placeholder={props.placeholder} type='text' value={props.option.description} onChange={(e) => valueChange(e)} />
            {/* <div className='d-flex'>
                <div style={{paddingTop:'2px'}}>
                    <input type='checkbox'
                        className='checkboxOption'
                        checked={props.option.isCorrect}
                        onChange={(e) => valueChange(null)} />
                </div>
                <span>Corrent</span>
            </div> */}
            <label style={{display:'flex', alignContent:'center'}}>  
                <input type="checkbox"  id='myCheckbox' checked={props.option.isCorrect}  onChange={(e) => valueChange(null)}/>
                <span className="custom-checkbox"></span> 
                <span style={{display:'block'}}>Correct</span>
            </label>
        </div>
    )
}
