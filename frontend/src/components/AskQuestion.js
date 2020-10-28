import React,{useState} from 'react';
import {Button,Modal,Form, Spinner} from 'react-bootstrap'
import AuthorInfo from './AuthorInfo';
import { useAuth } from '../hooks/useAuth';
import request from '../utils/requests';
import { createBrowserHistory } from 'history';
import AddTags from './AddTags/';


export default function AskQuestion() {
    const auth=useAuth();
    const [show, setShow] = useState(false);
    const [loading,setLoading]=useState(false);
    const [question,setQuestion]=useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button className="m-3" variant="primary" onClick={handleShow}>
            Ask a Question
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
                <Modal.Title>Ask a Question</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <AuthorInfo author={auth.user} self min/>
                <Form>
                    <Form.Group controlId="AskQuestionForm.ControlTextarea">
                        <Form.Label>Enter the question you want to ask:</Form.Label>
                        <Form.Control 
                            className="mb-1"
                            placeholder="Enter your Question Title here"
                            onChange={(e)=>{
                                setQuestion({...question,title:e.target.value});
                            }} 
                        />
                    </Form.Group>
                    <Form.Group controlId="AskQuestionForm.ControlTextarea">
                        <Form.Label>Enter description for your question to make it more clear</Form.Label>
                        <Form.Control 
                            className="mb-1"
                            placeholder="Write description for your question here" as="textarea" rows="3"
                            onChange={(e)=>{
                                setQuestion({...question,description:e.target.value});
                            }} 
                        />
                    </Form.Group>
                    <Form.Group controlId="AskQuestionForm.ControlTextarea">
                        <Form.Label>Tag your question:</Form.Label>
                        <AddTags setQuestion={setQuestion} question={question}/>
                        <Form.Text id="QuestionHelpBlock" muted>
                            Make sure the question you are going to ask is not already asked by someone else. We recommend searching before asking a new question.
                        </Form.Text>
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
                        console.log('submitting question');
                        request.post('/question',question)
                        .then((response)=>{
                            console.log(response.data._id);
                            setLoading(false);
                            createBrowserHistory().push(`#/question/${response.data._id}`)
                        })
                        .catch((error)=>{
                            alert('Network error!');
                            console.log(error)
                            setLoading(false);
                        })
                    }}
                >
                    Ask
                    {loading?<Spinner animation="border" role="status" size="sm"/>:null}
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}