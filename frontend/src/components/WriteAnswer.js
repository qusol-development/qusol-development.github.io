import React,{useState} from 'react';
import {Button,Modal,Form, Spinner} from 'react-bootstrap'
import AuthorInfo from './AuthorInfo';
import Editor from './Editor';
import {useAuth} from '../hooks/useAuth'
import request from '../utils/requests';

export default function WriteAnswer(props) {
    const auth=useAuth();
    const [show, setShow] = useState(false);
    const [loading,setLoading]=useState(false);
    const [answer,setAnswer]=useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button className="m-3" variant="primary" onClick={handleShow}>
            Write Answer
        </Button>
  
        <Modal
            centered
            size="xl"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            enforceFocus={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Write Answer for: {props.questionTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <AuthorInfo author={auth.user} self/>
                <Form>
                    <Form.Group controlId="AnswerForm.ControlTextarea">
                        <Form.Label>Enter your answer</Form.Label>
                        <Editor 
                            value={''} 
                            onChange={content => {
                                let img = document.createElement('div');
                                img.innerHTML=content;
                                img=img.querySelector('img');
                                setAnswer({ ...answer,body:content, 
                                // firstImg:img 
                                })
                            }}
                        />
                        <Form.Text id="QuestionHelpBlock" muted>
                            Make your submission awesome
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
                        console.log(answer);
                        request.post(`question/${props.questionID}/answer`,answer)
                        .then((response)=>{
                            const answer=response.data;
                            handleClose();
                            answer.key=answer._id;
                            props.setAnswers([{...answer}].concat(props.answers));
                            setLoading(false);
                        })
                        .catch((error)=>{
                            alert('error!',error);
                            console.log(error)
                            setLoading(false);
                        })
                    }}
                >
                    Submit Answer 
                    {loading?<Spinner animation="border" role="status" size="sm"/>:null}
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}