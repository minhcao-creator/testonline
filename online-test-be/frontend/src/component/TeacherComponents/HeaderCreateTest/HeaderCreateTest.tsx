import React from 'react';
import { Button } from '../Button/Button';
import './HeaderTest.css'
import { validateConfigure } from '../../../data/data';
export const HeaderCreateTest = (props: any) => {
    const handleCreateTest = () => {
        const checkConfigure = validateConfigure(props.createTest, props.setErrorConfigure);
        if (!checkConfigure) { 
            props.setPage(2);
            return false; 
        }
        return true;
    }
    return (
        <div className='headerTest'>
            <div className='d-flex justify-content-between'>
                <h5>CREATE NEW</h5>
                <div className='mr-5'>
                    <Button type={'2'} name={'Save'}
                        onClick={() => handleCreateTest()}
                    />
                </div>
            </div>
            <div className='d-flex justify-content-center mt-4 gap-3'>
                <Button type={'1'}
                    isActive={true}
                    name={'Create'}
                    style={{ cursor: 'default' }}
                />
                <div className='h-40'>
                    <p className='mb-0 mt-3' >...............................................</p>
                </div>
                {props.page == 2 ? (<Button type={'1'} isActive={true} name={'Configure'} style={{ cursor: 'default' }} />) : (<Button type={'1'} isActive={false} name={'Configure'} style={{ cursor: 'default' }} />)}
            </div>
        </div>
    )
}
