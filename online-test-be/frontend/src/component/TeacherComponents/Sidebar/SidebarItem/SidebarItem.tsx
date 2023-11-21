import React from 'react';
import './sideBarItem.css';
export const SidebarItem = (props: any) => {
    return (
        <div className='sideBarItem'>
            <div className='sideBarIcon'>
                {props.icon}
            </div>
            <div className='sideBarName'>
                {props.name}
            </div>
        </div>
    )
}
