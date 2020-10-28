import React,{useState} from 'react';
import {Button,Modal,Form, Spinner} from 'react-bootstrap'
import AuthorInfo from './AuthorInfo';
import { useAuth } from '../hooks/useAuth';
import Editor from './Editor';
import request from '../utils/requests';
import { createBrowserHistory } from 'history';
import AddTags from './AddTags/';

export default function WriteArticle() {
    const auth=useAuth();
    const [show, setShow] = useState(false);
    const [loading,setLoading]=useState(false);
    const [article,setArticle]=useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button className="m-3" variant="primary" onClick={handleShow}>
            Write an Article
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
                <Modal.Title>Write an Article</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <AuthorInfo author={auth.user} self min/>
                <Form>
                    <Form.Group controlId="WriteArticleForm.ControlTextarea">
                        <Form.Label>Enter the Title of your article:</Form.Label>
                        <Form.Control 
                            className="mb-1"
                            placeholder="Enter your Article Title here"
                            onChange={(e)=>{
                                setArticle({...article,title:e.target.value});
                            }} 
                        />
                    </Form.Group>
                    <Form.Group controlId="WriteArticleForm.ControlTextarea">
                        <Form.Label>Tag your article:</Form.Label>
                        <AddTags setQuestion={setArticle} question={article}/>
                    </Form.Group>
                    <Form.Group controlId="WriteArticleForm.ControlTextarea">
                        <Form.Label>Write content of your article</Form.Label>
                        <Editor 
                            value={''} 
                            onChange={content => {
                                let img = document.createElement('div');
                                img.innerHTML=content;
                                img=img.querySelector('img');
                                setArticle({ ...article,body:content, 
                                // firstImg:img 
                                })
                            }}
                        />
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
                        console.log('submitting Article');
                        request.post('/article',article)
                        .then((response)=>{
                            console.log(response.data._id);
                            setLoading(false);
                            createBrowserHistory().push(`#/article/${response.data._id}`)
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