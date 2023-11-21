import React from 'react'
import './button.css';
export const Button = (props: any) => {
   
    return (
        <>
            {props.isActive && props.type == '1' && (
                <button
                    className={props.className?`type-1 active ${props.className}`:'type-1 active'} style={props.style}
                    onClick={props.onClick}
                >
                    {props.name}
                </button>
            )}
            {props.isActive === false && props.type == '1' && (
                <button
                className={props.className?`type-1  ${props.className}`:'type-1'} style={props.style}
                onClick={props.onClick}
                >
                    {props.name}
                </button>
            )}
            {props.type == '2' && (
                <button
                className={props.className?`type-2  ${props.className}`:'type-2'} style={props.style}
                onClick={props.onClick}
                >
                    {props.name}
                </button>
            )}
        </>
    )
}
