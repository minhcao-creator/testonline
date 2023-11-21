import React, { Component, useState } from 'react';
import Create from '../../data/createImg.svg';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './style.css'

function CreateClassBox() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

  return (
    <div className='create-box'>
        <h5>Create</h5>
        <div className='create-box-flex'>
            <div>
                <img src={Create} alt='createclass' width='126px'/>
            </div>
            <div>
                <button className='btn-class' onClick={handleShow}>Create class</button>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control as="input" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className='btn-exit'>
                    Close
                </button>
                <button onClick={handleClose} className='btn-save'>
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    </div>
    
  )
}

export default CreateClassBox





