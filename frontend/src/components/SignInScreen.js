import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import userThumb from './userThumb.jpeg'
import {Button,Modal,Image,Dropdown} from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

function SignInScreen() {
    const auth=useAuth();

    const handleClose = () => auth.setSigninFormActive(false);
    const handleShow = () => auth.setSigninFormActive(true);

    // Configure FirebaseUI.
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    const imgSize={width:"36px",cursor:"pointer"}

    return (
    <>
    <Dropdown onClick={auth.user || auth.signinFormActive?null:handleShow}>
        <Dropdown.Toggle as="div" id="dropdown-basic">
            <Image className="m-1" src={auth.user ? auth.user.photoURL ? auth.user.photoURL : userThumb: userThumb} roundedCircle style={imgSize}/>
        </Dropdown.Toggle>
        {auth.user?
            <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Header>Hello <strong>{auth.user.displayName}!</strong></Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={auth.signout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        :
            <Modal
                centered
                show={auth.signinFormActive}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Authenticate</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <p>Please sign-in:</p>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        }
    </Dropdown>
    </>
    );
}

export default SignInScreen;