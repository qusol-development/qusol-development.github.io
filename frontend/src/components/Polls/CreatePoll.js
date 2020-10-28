import React, { useState } from 'react';
import { Button,Modal,Form, Spinner,Col } from 'react-bootstrap'
import AuthorInfo from '../AuthorInfo';
import { useAuth } from '../../hooks/useAuth';
import request from '../../utils/requests';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserHistory } from 'history';
import AddTags from '../AddTags/';

export default function CreatPoll() {
    const auth=useAuth();
    const [show, setShow] = useState(false);
    const [loading,setLoading]=useState(false);
    const [poll,setPoll]=useState({options:{}});
    const [editingOption,setEditingOption]=useState("");
    const [editingOptionId,setEditingOptionId]=useState(uuidv4());
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addOption = () => {
        if(editingOption!=""){
            // setPoll(...poll,options:{...poll.options,editingOptionId:{text:editingOption}})
            setEditingOption("");
        }
    }


    return (
      <>
        <Button className="m-3" variant="primary" onClick={handleShow}>
            Create a Poll
        </Button>
  
        <Modal
            centered
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create a Poll</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <AuthorInfo author={auth.user} self min/>
                <Form>
                    <Form.Group controlId="WritePollForm.ControlTextarea">
                        <Form.Label>Enter the Title of your poll:</Form.Label>
                        <Form.Control 
                            className="mb-1"
                            placeholder="Enter your Poll Title here"
                            onChange={(e)=>{
                                setPoll({...poll,title:e.target.value});
                            }} 
                        />
                    </Form.Group>
                    <Form.Group controlId="WritePollForm.ControlTextarea">
                        <Form.Label>Tag your poll:</Form.Label>
                        <AddTags setQuestion={setPoll} question={poll}/>
                    </Form.Group>
                    <Form.Group controlId="WritePollForm.ControlTextarea">
                        <Form.Label>Options:</Form.Label>
                        <Form.Row className="align-items-center">
                            <Col>
                                <Form.Label htmlFor="inlineFormInput" srOnly>
                                    Option Text
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    id="inlineFormInput"
                                    placeholder="Option text"
                                    onChange={(e)=>{
                                        setEditingOption(e.target.value);
                                    }} 
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="success" size="sm" onClick={addOption}>
                                    + Add Option
                                </Button>
                            </Col>
                        </Form.Row>
                        
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={()=>{
                        setLoading(true);
                        console.log('submitting Poll');
                        request.post('/poll',poll)
                        .then((response)=>{
                            console.log(response.data._id);
                            setLoading(false);
                            createBrowserHistory().push(`#/poll/${response.data._id}`)
                        })
                        .catch((error)=>{
                            alert('Network error!');
                            console.log(error)
                            setLoading(false);
                        })
                    }}
                >
                    Publish
                    {loading?<Spinner animation="border" role="status" size="sm"/>:null}
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}