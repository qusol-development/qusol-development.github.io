import React, { useState } from 'react';
import {Button,Row,Form, Col, InputGroup} from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import requests from '../../utils/requests';

export default function ProfileForm(props){
    const [profileData,setProfileData]=useState(props.initialValues);
    const handleSubmit=(e)=>{
        e.preventDefault();
        requests.post(`/user`,profileData)
        .then((response)=>{
            console.log(response.data);
        })
        .catch((error)=>{
            alert('Network error!');
            console.log(error)
        })
    }
    return (
        <Form className='m-3 w-50 mx-auto'>
            <Form.Group as={Row} controlId="username">
                <Form.Label column sm={2}>Username</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                            onChange={(e)=>setProfileData({...profileData,username:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="bio">
                <Form.Label column sm={2}>Bio</Form.Label>
                <Col sm={10}>
                    <Form.Control placeholder="Bio" onChange={(e)=>setProfileData({...profileData,bio:e.target.value})}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" onClick={handleSubmit}>Save</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}