import React from 'react';
import { useParams } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import UserInfo from './UserInfo';
import UserActivity from './UserActivity';

export default function User(props){
  const uid=useParams().uid;
  return (
      <Container fluid className="mx-4 mt-2 w-auto">
        <Row>
          <Col xs={"auto"} className="d-none d-lg-block p-0">
            <UserInfo uid={uid}/>
          </Col>
          <Col className="p-0 px-sm-2 px-md-3">
            <UserActivity uid={uid}/>
          </Col>
        </Row>
      </Container>
  );
}
